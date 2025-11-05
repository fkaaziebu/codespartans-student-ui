/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation CreateCheckout($autoApproveSubscription: Boolean!, $checkoutFromCart: Boolean, $courseId: String) {\n  createCheckout(\n    autoApproveSubscription: $autoApproveSubscription\n    checkoutFromCart: $checkoutFromCart\n    courseId: $courseId\n  ) {\n    id\n  }\n}": typeof types.CreateCheckoutDocument,
    "mutation EndTest($testId: String!) {\n  endTest(testId: $testId) {\n    id\n    status\n  }\n}": typeof types.EndTestDocument,
    "mutation PauseTest($testId: String!) {\n  pauseTest(testId: $testId) {\n    id\n    status\n  }\n}": typeof types.PauseTestDocument,
    "mutation RegisterStudent($name: String!, $email: String!, $password: String!, $organizationId: String!) {\n  registerStudent(\n    name: $name\n    email: $email\n    password: $password\n    organizationId: $organizationId\n  ) {\n    message\n  }\n}": typeof types.RegisterStudentDocument,
    "mutation ResumeTest($testId: String!) {\n  resumeTest(testId: $testId) {\n    id\n    status\n  }\n}": typeof types.ResumeTestDocument,
    "mutation StartTest($suiteId: String!) {\n  startTest(suiteId: $suiteId) {\n    id\n    status\n  }\n}": typeof types.StartTestDocument,
    "mutation SubmitAnswer($testId: String!, $questionId: String!, $timeRange: String!, $answer: String!) {\n  submitAnswer(\n    testId: $testId\n    questionId: $questionId\n    timeRange: $timeRange\n    answer: $answer\n  ) {\n    answer_provided\n    hints_used\n    id\n    is_flagged\n    question_id\n  }\n}": typeof types.SubmitAnswerDocument,
    "query GetOrganizationCourse($courseId: String!) {\n  getOrganizationCourse(courseId: $courseId) {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    instructor {\n      id\n      email\n      name\n    }\n    level\n    price\n    title\n  }\n}": typeof types.GetOrganizationCourseDocument,
    "query GetQuestion($testId: String!) {\n  getQuestion(testId: $testId) {\n    description\n    difficulty\n    estimated_time_in_ms\n    hints\n    id\n    options\n    question_number\n    solution_steps\n    tags\n    type\n  }\n}": typeof types.GetQuestionDocument,
    "query GetSubscribedCourseDetails($courseId: String!) {\n  getSubscribedCourseDetails(courseId: $courseId) {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    level\n    price\n    title\n    instructor {\n      id\n      email\n      name\n    }\n    approved_version {\n      id\n      questions {\n        id\n      }\n      test_suites {\n        id\n        description\n        keywords\n        title\n        difficulty\n        questions {\n          id\n        }\n      }\n    }\n  }\n}": typeof types.GetSubscribedCourseDetailsDocument,
    "query ListOrganizationCourses($organizationId: String!) {\n  listOrganizationCourses(organizationId: $organizationId) {\n    edges {\n      node {\n        id\n        title\n        instructor {\n          id\n          name\n          email\n        }\n        avatar_url\n        currency\n        description\n        domains\n        level\n        price\n        is_subscribed\n        total_questions\n        estimated_duration\n      }\n    }\n  }\n}": typeof types.ListOrganizationCoursesDocument,
    "query ListOrganizations($searchTerm: String, $pagination: PaginationInput) {\n  listOrganizations(searchTerm: $searchTerm, pagination: $pagination) {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n}": typeof types.ListOrganizationsDocument,
    "query LoginStudent($email: String!, $password: String!) {\n  loginStudent(email: $email, password: $password) {\n    id\n    email\n    name\n    token\n    organizations {\n      id\n    }\n  }\n}": typeof types.LoginStudentDocument,
};
const documents: Documents = {
    "mutation CreateCheckout($autoApproveSubscription: Boolean!, $checkoutFromCart: Boolean, $courseId: String) {\n  createCheckout(\n    autoApproveSubscription: $autoApproveSubscription\n    checkoutFromCart: $checkoutFromCart\n    courseId: $courseId\n  ) {\n    id\n  }\n}": types.CreateCheckoutDocument,
    "mutation EndTest($testId: String!) {\n  endTest(testId: $testId) {\n    id\n    status\n  }\n}": types.EndTestDocument,
    "mutation PauseTest($testId: String!) {\n  pauseTest(testId: $testId) {\n    id\n    status\n  }\n}": types.PauseTestDocument,
    "mutation RegisterStudent($name: String!, $email: String!, $password: String!, $organizationId: String!) {\n  registerStudent(\n    name: $name\n    email: $email\n    password: $password\n    organizationId: $organizationId\n  ) {\n    message\n  }\n}": types.RegisterStudentDocument,
    "mutation ResumeTest($testId: String!) {\n  resumeTest(testId: $testId) {\n    id\n    status\n  }\n}": types.ResumeTestDocument,
    "mutation StartTest($suiteId: String!) {\n  startTest(suiteId: $suiteId) {\n    id\n    status\n  }\n}": types.StartTestDocument,
    "mutation SubmitAnswer($testId: String!, $questionId: String!, $timeRange: String!, $answer: String!) {\n  submitAnswer(\n    testId: $testId\n    questionId: $questionId\n    timeRange: $timeRange\n    answer: $answer\n  ) {\n    answer_provided\n    hints_used\n    id\n    is_flagged\n    question_id\n  }\n}": types.SubmitAnswerDocument,
    "query GetOrganizationCourse($courseId: String!) {\n  getOrganizationCourse(courseId: $courseId) {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    instructor {\n      id\n      email\n      name\n    }\n    level\n    price\n    title\n  }\n}": types.GetOrganizationCourseDocument,
    "query GetQuestion($testId: String!) {\n  getQuestion(testId: $testId) {\n    description\n    difficulty\n    estimated_time_in_ms\n    hints\n    id\n    options\n    question_number\n    solution_steps\n    tags\n    type\n  }\n}": types.GetQuestionDocument,
    "query GetSubscribedCourseDetails($courseId: String!) {\n  getSubscribedCourseDetails(courseId: $courseId) {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    level\n    price\n    title\n    instructor {\n      id\n      email\n      name\n    }\n    approved_version {\n      id\n      questions {\n        id\n      }\n      test_suites {\n        id\n        description\n        keywords\n        title\n        difficulty\n        questions {\n          id\n        }\n      }\n    }\n  }\n}": types.GetSubscribedCourseDetailsDocument,
    "query ListOrganizationCourses($organizationId: String!) {\n  listOrganizationCourses(organizationId: $organizationId) {\n    edges {\n      node {\n        id\n        title\n        instructor {\n          id\n          name\n          email\n        }\n        avatar_url\n        currency\n        description\n        domains\n        level\n        price\n        is_subscribed\n        total_questions\n        estimated_duration\n      }\n    }\n  }\n}": types.ListOrganizationCoursesDocument,
    "query ListOrganizations($searchTerm: String, $pagination: PaginationInput) {\n  listOrganizations(searchTerm: $searchTerm, pagination: $pagination) {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n}": types.ListOrganizationsDocument,
    "query LoginStudent($email: String!, $password: String!) {\n  loginStudent(email: $email, password: $password) {\n    id\n    email\n    name\n    token\n    organizations {\n      id\n    }\n  }\n}": types.LoginStudentDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateCheckout($autoApproveSubscription: Boolean!, $checkoutFromCart: Boolean, $courseId: String) {\n  createCheckout(\n    autoApproveSubscription: $autoApproveSubscription\n    checkoutFromCart: $checkoutFromCart\n    courseId: $courseId\n  ) {\n    id\n  }\n}"): (typeof documents)["mutation CreateCheckout($autoApproveSubscription: Boolean!, $checkoutFromCart: Boolean, $courseId: String) {\n  createCheckout(\n    autoApproveSubscription: $autoApproveSubscription\n    checkoutFromCart: $checkoutFromCart\n    courseId: $courseId\n  ) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation EndTest($testId: String!) {\n  endTest(testId: $testId) {\n    id\n    status\n  }\n}"): (typeof documents)["mutation EndTest($testId: String!) {\n  endTest(testId: $testId) {\n    id\n    status\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation PauseTest($testId: String!) {\n  pauseTest(testId: $testId) {\n    id\n    status\n  }\n}"): (typeof documents)["mutation PauseTest($testId: String!) {\n  pauseTest(testId: $testId) {\n    id\n    status\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RegisterStudent($name: String!, $email: String!, $password: String!, $organizationId: String!) {\n  registerStudent(\n    name: $name\n    email: $email\n    password: $password\n    organizationId: $organizationId\n  ) {\n    message\n  }\n}"): (typeof documents)["mutation RegisterStudent($name: String!, $email: String!, $password: String!, $organizationId: String!) {\n  registerStudent(\n    name: $name\n    email: $email\n    password: $password\n    organizationId: $organizationId\n  ) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ResumeTest($testId: String!) {\n  resumeTest(testId: $testId) {\n    id\n    status\n  }\n}"): (typeof documents)["mutation ResumeTest($testId: String!) {\n  resumeTest(testId: $testId) {\n    id\n    status\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation StartTest($suiteId: String!) {\n  startTest(suiteId: $suiteId) {\n    id\n    status\n  }\n}"): (typeof documents)["mutation StartTest($suiteId: String!) {\n  startTest(suiteId: $suiteId) {\n    id\n    status\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SubmitAnswer($testId: String!, $questionId: String!, $timeRange: String!, $answer: String!) {\n  submitAnswer(\n    testId: $testId\n    questionId: $questionId\n    timeRange: $timeRange\n    answer: $answer\n  ) {\n    answer_provided\n    hints_used\n    id\n    is_flagged\n    question_id\n  }\n}"): (typeof documents)["mutation SubmitAnswer($testId: String!, $questionId: String!, $timeRange: String!, $answer: String!) {\n  submitAnswer(\n    testId: $testId\n    questionId: $questionId\n    timeRange: $timeRange\n    answer: $answer\n  ) {\n    answer_provided\n    hints_used\n    id\n    is_flagged\n    question_id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetOrganizationCourse($courseId: String!) {\n  getOrganizationCourse(courseId: $courseId) {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    instructor {\n      id\n      email\n      name\n    }\n    level\n    price\n    title\n  }\n}"): (typeof documents)["query GetOrganizationCourse($courseId: String!) {\n  getOrganizationCourse(courseId: $courseId) {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    instructor {\n      id\n      email\n      name\n    }\n    level\n    price\n    title\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetQuestion($testId: String!) {\n  getQuestion(testId: $testId) {\n    description\n    difficulty\n    estimated_time_in_ms\n    hints\n    id\n    options\n    question_number\n    solution_steps\n    tags\n    type\n  }\n}"): (typeof documents)["query GetQuestion($testId: String!) {\n  getQuestion(testId: $testId) {\n    description\n    difficulty\n    estimated_time_in_ms\n    hints\n    id\n    options\n    question_number\n    solution_steps\n    tags\n    type\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetSubscribedCourseDetails($courseId: String!) {\n  getSubscribedCourseDetails(courseId: $courseId) {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    level\n    price\n    title\n    instructor {\n      id\n      email\n      name\n    }\n    approved_version {\n      id\n      questions {\n        id\n      }\n      test_suites {\n        id\n        description\n        keywords\n        title\n        difficulty\n        questions {\n          id\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetSubscribedCourseDetails($courseId: String!) {\n  getSubscribedCourseDetails(courseId: $courseId) {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    level\n    price\n    title\n    instructor {\n      id\n      email\n      name\n    }\n    approved_version {\n      id\n      questions {\n        id\n      }\n      test_suites {\n        id\n        description\n        keywords\n        title\n        difficulty\n        questions {\n          id\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListOrganizationCourses($organizationId: String!) {\n  listOrganizationCourses(organizationId: $organizationId) {\n    edges {\n      node {\n        id\n        title\n        instructor {\n          id\n          name\n          email\n        }\n        avatar_url\n        currency\n        description\n        domains\n        level\n        price\n        is_subscribed\n        total_questions\n        estimated_duration\n      }\n    }\n  }\n}"): (typeof documents)["query ListOrganizationCourses($organizationId: String!) {\n  listOrganizationCourses(organizationId: $organizationId) {\n    edges {\n      node {\n        id\n        title\n        instructor {\n          id\n          name\n          email\n        }\n        avatar_url\n        currency\n        description\n        domains\n        level\n        price\n        is_subscribed\n        total_questions\n        estimated_duration\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListOrganizations($searchTerm: String, $pagination: PaginationInput) {\n  listOrganizations(searchTerm: $searchTerm, pagination: $pagination) {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n}"): (typeof documents)["query ListOrganizations($searchTerm: String, $pagination: PaginationInput) {\n  listOrganizations(searchTerm: $searchTerm, pagination: $pagination) {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query LoginStudent($email: String!, $password: String!) {\n  loginStudent(email: $email, password: $password) {\n    id\n    email\n    name\n    token\n    organizations {\n      id\n    }\n  }\n}"): (typeof documents)["query LoginStudent($email: String!, $password: String!) {\n  loginStudent(email: $email, password: $password) {\n    id\n    email\n    name\n    token\n    organizations {\n      id\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;