import { useCallback, useEffect, useRef, useState } from "react";

export interface SSEStreamEvent {
  type: "time_update" | "test_ended" | "test_paused" | "test_resumed";
  remainingSeconds?: number;
  remainingMs?: number;
  timestamp: string;
}

export interface UseSSEStreamOptions {
  onEvent?: (event: SSEStreamEvent) => void;
  onError?: (error: Error) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  reconnectDelay?: number; // milliseconds
  maxReconnectAttempts?: number;
}

/**
 * Custom hook for managing SSE (Server-Sent Events) connections
 * Handles automatic reconnection, error handling, and cleanup
 */
export function useSSEStream(
  streamUrl: string,
  options: UseSSEStreamOptions = {},
) {
  const {
    onEvent,
    onError,
    onConnect,
    onDisconnect,
    reconnectDelay = 3000,
    maxReconnectAttempts = 10,
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);

  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isManualDisconnectRef = useRef(false);

  /**
   * Connect to the SSE stream
   */
  const connect = useCallback(() => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    isManualDisconnectRef.current = false;

    try {
      const eventSource = new EventSource(streamUrl);

      /**
       * Handle incoming messages from the server
       */
      eventSource.addEventListener("message", (event) => {
        try {
          const data = JSON.parse(event.data) as SSEStreamEvent;
          onEvent?.(data);
        } catch (parseError) {
          const error = new Error(`Failed to parse SSE event: ${parseError}`);
          setError(error);
          onError?.(error);
        }
      });

      /**
       * Handle connection open
       */
      eventSource.addEventListener("open", () => {
        setIsConnected(true);
        setError(null);
        setReconnectAttempts(0);
        onConnect?.();
      });

      /**
       * Handle connection errors
       */
      eventSource.addEventListener("error", () => {
        setIsConnected(false);
        eventSource.close();

        if (!isManualDisconnectRef.current) {
          // Only attempt to reconnect if not manually disconnected
          setReconnectAttempts((prev) => prev + 1);

          if (reconnectAttempts < maxReconnectAttempts) {
            // Schedule reconnection attempt
            reconnectTimeoutRef.current = setTimeout(() => {
              connect();
            }, reconnectDelay);
          } else {
            const error = new Error(
              `Failed to connect after ${maxReconnectAttempts} attempts`,
            );
            setError(error);
            onError?.(error);
          }
        }
      });

      eventSourceRef.current = eventSource;
    } catch (error) {
      const connectionError = new Error(
        `Failed to create EventSource: ${error}`,
      );
      setError(connectionError);
      onError?.(connectionError);
    }
  }, [
    streamUrl,
    // onEvent,
    // onError,
    // onConnect,
    // reconnectDelay,
    // maxReconnectAttempts,
    // reconnectAttempts,
  ]);

  /**
   * Disconnect from the SSE stream
   */
  const disconnect = useCallback(() => {
    isManualDisconnectRef.current = true;

    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    setIsConnected(false);
    onDisconnect?.();
  }, [onDisconnect]);

  /**
   * Connect on mount, disconnect on unmount
   */
  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    error,
    reconnectAttempts,
    disconnect,
    reconnect: connect,
  };
}
