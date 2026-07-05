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
    "mutation ActivateStudentDemo($input: ActivateStudentDemoInput!) {\n  activateStudentDemo(input: $input) {\n    id\n    name\n    email\n    is_setup_completed\n    token\n    refresh_token\n  }\n}": typeof types.ActivateStudentDemoDocument,
    "mutation AddCourseToCart($courseId: String!) {\n  addCourseToCart(courseId: $courseId) {\n    id\n  }\n}": typeof types.AddCourseToCartDocument,
    "mutation CancelStudentAccountDeletion {\n  cancelStudentAccountDeletion {\n    token\n    refresh_token\n    account_status\n    name\n    email\n    is_setup_completed\n    organizations {\n      id\n      email\n    }\n  }\n}": typeof types.CancelStudentAccountDeletionDocument,
    "mutation ChangePin($currentPin: String!, $newPin: String!) {\n  changePin(currentPin: $currentPin, newPin: $newPin) {\n    message\n  }\n}": typeof types.ChangePinDocument,
    "mutation ChangeStudentPassword($currentPassword: String!, $newPassword: String!) {\n  changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {\n    message\n  }\n}": typeof types.ChangeStudentPasswordDocument,
    "mutation CompleteSetup($categoryId: String!, $courseIds: [String!]!) {\n  completeSetup(categoryId: $categoryId, courseIds: $courseIds) {\n    id\n    is_setup_completed\n    email\n    name\n  }\n}": typeof types.CompleteSetupDocument,
    "mutation CompleteStudentAccountValidation($email: String!, $validationCode: String!) {\n  completeStudentAccountValidation(\n    email: $email\n    validation_code: $validationCode\n  ) {\n    message\n  }\n}": typeof types.CompleteStudentAccountValidationDocument,
    "mutation CreateCheckout($autoApproveSubscription: Boolean!, $checkoutFromCart: Boolean, $courseId: String) {\n  createCheckout(\n    autoApproveSubscription: $autoApproveSubscription\n    checkoutFromCart: $checkoutFromCart\n    courseId: $courseId\n  ) {\n    id\n  }\n}": typeof types.CreateCheckoutDocument,
    "mutation EndTest($testId: String!) {\n  endTest(testId: $testId) {\n    id\n    status\n  }\n}": typeof types.EndTestDocument,
    "mutation InitiatePayment($planId: String!, $children: [String!]!) {\n  initiatePayment(planId: $planId, children: $children) {\n    authorization_url\n    reference\n  }\n}": typeof types.InitiatePaymentDocument,
    "mutation LoginChild($input: LoginChildInput!) {\n  loginChild(input: $input) {\n    id\n    full_name\n    class_level\n    target_exam\n    school_name\n    username\n    token\n    refresh_token\n    student {\n      id\n      name\n      email\n      is_setup_completed\n      organizations {\n        id\n        email\n      }\n    }\n  }\n}": typeof types.LoginChildDocument,
    "mutation PauseTest($testId: String!) {\n  pauseTest(testId: $testId) {\n    id\n    status\n  }\n}": typeof types.PauseTestDocument,
    "mutation RefreshStudentToken($refreshToken: String!) {\n  refreshStudentToken(refresh_token: $refreshToken) {\n    access_token\n  }\n}": typeof types.RefreshStudentTokenDocument,
    "mutation RegisterStudent($name: String!, $email: String!, $password: String!) {\n  registerStudent(name: $name, email: $email, password: $password) {\n    message\n  }\n}": typeof types.RegisterStudentDocument,
    "mutation RemoveCourseFromCart($courseId: String!) {\n  removeCourseFromCart(courseId: $courseId) {\n    id\n  }\n}": typeof types.RemoveCourseFromCartDocument,
    "mutation RequestStudentAccountDeletion {\n  requestStudentAccountDeletion {\n    message\n    deletionScheduledFor\n    status\n  }\n}": typeof types.RequestStudentAccountDeletionDocument,
    "mutation RequestStudentPasswordReset($email: String!) {\n  requestStudentPasswordReset(email: $email) {\n    message\n  }\n}": typeof types.RequestStudentPasswordResetDocument,
    "mutation ResendAccountValidationCode($email: String!) {\n  resendAccountValidationCode(email: $email) {\n    message\n  }\n}": typeof types.ResendAccountValidationCodeDocument,
    "mutation ResetStudentPassword($email: String!, $token: String!, $password: String!) {\n  resetStudentPassword(email: $email, token: $token, password: $password) {\n    message\n  }\n}": typeof types.ResetStudentPasswordDocument,
    "mutation ResumeTest($testId: String!) {\n  resumeTest(testId: $testId) {\n    id\n    status\n  }\n}": typeof types.ResumeTestDocument,
    "mutation StartAssignedTest($assignmentId: String!, $mode: TestModeType) {\n  startAssignedTest(assignmentId: $assignmentId, mode: $mode) {\n    id\n    status\n    course_id\n  }\n}": typeof types.StartAssignedTestDocument,
    "mutation StartTest($suiteId: String!, $mode: TestModeType) {\n  startTest(suiteId: $suiteId, mode: $mode) {\n    id\n    status\n  }\n}": typeof types.StartTestDocument,
    "mutation SubmitAnswer($testId: String!, $questionId: String!, $timeRange: String!, $answer: String!, $isFlagged: Boolean!) {\n  submitAnswer(\n    testId: $testId\n    questionId: $questionId\n    timeRange: $timeRange\n    answer: $answer\n    isFlagged: $isFlagged\n  ) {\n    answer_provided\n    hints_used\n    id\n    is_flagged\n    is_correct\n    is_marked\n    question_id\n  }\n}": typeof types.SubmitAnswerDocument,
    "mutation VerifyStudentCancellationOtp($otp: String!) {\n  verifyCancellationOtp(otp: $otp) {\n    message\n  }\n}": typeof types.VerifyStudentCancellationOtpDocument,
    "mutation VerifyChildUsername($input: VerifyChildUsernameInput!) {\n  verifyChildUsername(input: $input) {\n    temp_token\n  }\n}": typeof types.VerifyChildUsernameDocument,
    "query GetActiveTest {\n  getActiveTest {\n    id\n    mode\n    status\n    course_id\n  }\n}": typeof types.GetActiveTestDocument,
    "query GetAllAttemptedQuestions($testId: String!) {\n  getAllAttemptedQuestions(testId: $testId) {\n    answer_provided\n    question_id\n    is_flagged\n    is_correct\n    is_marked\n    question {\n      type\n    }\n  }\n}": typeof types.GetAllAttemptedQuestionsDocument,
    "query GetCategoryCountdown($categoryId: String!) {\n  getCategoryCountdown(categoryId: $categoryId) {\n    categoryName\n    countdown\n    exam_duration_days\n  }\n}": typeof types.GetCategoryCountdownDocument,
    "query GetCurrentStreakCount {\n  getCurrentStreakCount {\n    current_streak\n    best_streak\n  }\n}": typeof types.GetCurrentStreakCountDocument,
    "query GetOrganizationCourse($courseId: String!) {\n  getOrganizationCourse(courseId: $courseId) {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    instructor {\n      id\n      email\n      name\n    }\n    level\n    price\n    title\n    is_subscribed\n    is_course_in_cart\n  }\n}": typeof types.GetOrganizationCourseDocument,
    "query GetQuestion($testId: String!) {\n  getQuestion(testId: $testId) {\n    description\n    difficulty\n    estimated_time_in_ms\n    hints\n    id\n    options\n    question_number\n    solution_steps\n    tags\n    type\n  }\n}": typeof types.GetQuestionDocument,
    "query GetStudentStats {\n  getStudentStats {\n    total_test_taken\n    total_test_taken_percentage_change\n    average_score\n    average_score_percentage_change\n    study_hours\n    weak_areas_count\n  }\n}": typeof types.GetStudentStatsDocument,
    "query GetStudentSubscription {\n  getMyStudentSubscription {\n    id\n    status\n    started_at\n    expires_at\n    plan {\n      id\n      name\n      price\n      currency\n      interval\n      duration_days\n    }\n  }\n}": typeof types.GetStudentSubscriptionDocument,
    "query GetSubscribedCourseDetails($courseId: String!) {\n  getSubscribedCourseDetails(courseId: $courseId) {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    level\n    price\n    title\n    instructor {\n      id\n      email\n      name\n    }\n    approved_version {\n      id\n      questions {\n        id\n        question_number\n        description\n        options\n        hints\n        estimated_time_in_ms\n        difficulty\n        correct_answer\n        solution_steps\n        tags\n        type\n        marks\n      }\n      test_suites {\n        id\n        description\n        keywords\n        title\n        difficulty\n        suite_type\n        questions {\n          id\n        }\n      }\n    }\n  }\n}": typeof types.GetSubscribedCourseDetailsDocument,
    "query GetTestScoreHistory($testId: String) {\n  getTestScoreHistory(testId: $testId) {\n    test_id\n    course_title\n    score\n    date_taken\n  }\n}": typeof types.GetTestScoreHistoryDocument,
    "query GetTest($testId: String!) {\n  getTest(testId: $testId) {\n    course_id\n    course_category\n    id\n    mode\n    status\n    submitted_answers {\n      id\n      answer_provided\n      hints_used\n      is_flagged\n      question_id\n      is_correct\n      is_marked\n      question {\n        id\n        marks\n        question_number\n        description\n        hints\n        solution_steps\n        options\n        type\n        tags\n        class_level\n        exam_year\n        correct_answer\n        difficulty\n        estimated_time_in_ms\n      }\n    }\n    test_suite {\n      questions {\n        id\n        marks\n        question_number\n        description\n        hints\n        solution_steps\n        options\n        type\n        tags\n        class_level\n        exam_year\n        correct_answer\n        difficulty\n        estimated_time_in_ms\n      }\n      title\n      id\n      difficulty\n      description\n    }\n    time_events {\n      type\n      recorded_at\n    }\n  }\n}": typeof types.GetTestDocument,
    "query GetWeeklyInsight {\n  getWeeklyInsight {\n    title\n    description\n    suites {\n      suite_id\n      title\n      accuracy\n    }\n  }\n}": typeof types.GetWeeklyInsightDocument,
    "query ListAttempts($searchTerm: String, $filter: AttemptFilterInput, $pagination: PaginationInput) {\n  listAttempts(searchTerm: $searchTerm, filter: $filter, pagination: $pagination) {\n    count\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n    edges {\n      node {\n        id\n        course_id\n        date_taken\n        course_title\n        correct\n        mode\n        score\n        status\n        time_taken\n        trend\n        wrong\n      }\n    }\n  }\n}": typeof types.ListAttemptsDocument,
    "query ListCartCourses {\n  listCartCourses {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    instructor {\n      id\n      email\n      name\n    }\n    level\n    price\n    title\n  }\n}": typeof types.ListCartCoursesDocument,
    "query ListCourseSuites($courseId: String!, $suiteTypes: [SuiteType!], $pagination: PaginationInput) {\n  listCourseSuites(\n    courseId: $courseId\n    suiteTypes: $suiteTypes\n    pagination: $pagination\n  ) {\n    edges {\n      node {\n        id\n        title\n        description\n        keywords\n        difficulty\n        suite_type\n        image_url\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    count\n  }\n}": typeof types.ListCourseSuitesDocument,
    "query ListCoursesForOrganization($searchTerm: String, $pagination: PaginationInput) {\n  listCoursesForOrganization(searchTerm: $searchTerm, pagination: $pagination) {\n    count\n    edges {\n      node {\n        id\n        avatar_url\n        estimated_duration\n        domains\n        description\n        currency\n        inserted_at\n        is_subscribed\n        level\n        price\n        title\n        total_questions\n        updated_at\n        instructor {\n          id\n          name\n          email\n          status\n        }\n      }\n    }\n  }\n}": typeof types.ListCoursesForOrganizationDocument,
    "query ListMyAssignments {\n  listMyAssignments {\n    id\n    status\n    assigned_at\n    completed_at\n    note\n    parent {\n      first_name\n      last_name\n      gender\n    }\n    test_suite {\n      id\n      title\n      description\n      difficulty\n    }\n    test {\n      id\n      status\n      course_id\n    }\n  }\n}": typeof types.ListMyAssignmentsDocument,
    "query ListOrganizationCategories {\n  listOrganizationCategories {\n    id\n    name\n    courses {\n      id\n      level\n      price\n      title\n      domains\n      description\n      currency\n      avatar_url\n      is_mandatory\n    }\n  }\n}": typeof types.ListOrganizationCategoriesDocument,
    "query ListOrganizationCourses($organizationId: String, $searchTerm: String, $filter: CourseFilterInput, $pagination: PaginationInput) {\n  listOrganizationCourses(\n    organizationId: $organizationId\n    searchTerm: $searchTerm\n    filter: $filter\n    pagination: $pagination\n  ) {\n    edges {\n      node {\n        id\n        avatar_url\n        currency\n        description\n        domains\n        is_subscribed\n        level\n        price\n        title\n        total_questions\n        estimated_duration\n        updated_at\n        inserted_at\n        approved_version {\n          id\n          status\n          inserted_at\n          updated_at\n          version_number\n          test_suites {\n            id\n            description\n            difficulty\n            keywords\n            suite_type\n            image_url\n            title\n          }\n        }\n      }\n    }\n  }\n}": typeof types.ListOrganizationCoursesDocument,
    "query ListOrganizations($searchTerm: String, $pagination: PaginationInput) {\n  listOrganizations(searchTerm: $searchTerm, pagination: $pagination) {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n}": typeof types.ListOrganizationsDocument,
    "query ListStudentSubscriptions {\n  listMyStudentSubscriptions {\n    id\n    status\n    started_at\n    expires_at\n    plan {\n      id\n      name\n      price\n      currency\n      interval\n      duration_days\n    }\n  }\n}": typeof types.ListStudentSubscriptionsDocument,
    "query ListSubscriptionPlans {\n  listSubscriptionPlans {\n    id\n    plan_key\n    name\n    tagline\n    price\n    currency\n    interval\n    duration_days\n    features\n    billing_label\n  }\n}": typeof types.ListSubscriptionPlansDocument,
    "query LoginStudent($email: String!, $password: String!) {\n  loginStudent(email: $email, password: $password) {\n    id\n    email\n    name\n    token\n    refresh_token\n    account_status\n    deletion_scheduled_for\n    is_setup_completed\n    organizations {\n      id\n      email\n    }\n  }\n}": typeof types.LoginStudentDocument,
    "query StudentProfile {\n  studentProfile {\n    id\n    name\n    email\n    is_setup_completed\n    organizations {\n      id\n      email\n    }\n    subscribed_categories {\n      id\n      name\n    }\n  }\n}": typeof types.StudentProfileDocument,
    "query StudentSubjectProgress($testId: String) {\n  studentSubjectProgress(testId: $testId) {\n    subject\n    total\n    correct\n    wrong\n    score\n  }\n}": typeof types.StudentSubjectProgressDocument,
    "query StudentTestTopicProgress($testId: String!) {\n  studentTestTopicProgress(testId: $testId) {\n    topic\n    total\n    correct\n    wrong\n    score\n  }\n}": typeof types.StudentTestTopicProgressDocument,
    "query TestStats($testId: String!) {\n  testStats(testId: $testId) {\n    submitted_answers {\n      answer_provided\n      hints_used\n      id\n      is_flagged\n      is_correct\n      is_marked\n      question {\n        correct_answer\n        description\n        difficulty\n        estimated_time_in_ms\n        hints\n        id\n        marks\n        options\n        question_number\n        solution_steps\n        tags\n        type\n      }\n      question_id\n    }\n    status\n    id\n    test_suite {\n      id\n      questions {\n        correct_answer\n        description\n        difficulty\n        estimated_time_in_ms\n        id\n        marks\n        options\n        question_number\n        solution_steps\n        tags\n        type\n        hints\n      }\n    }\n  }\n}": typeof types.TestStatsDocument,
    "query WeakSubjectAreas($testId: String) {\n  weakSubjectAreas(testId: $testId) {\n    subject\n    error_count\n    total\n    accuracy\n    questions {\n      id\n      question_number\n      description\n      hints\n      solution_steps\n      options\n      type\n      tags\n      correct_answer\n      difficulty\n      estimated_time_in_ms\n    }\n  }\n}": typeof types.WeakSubjectAreasDocument,
};
const documents: Documents = {
    "mutation ActivateStudentDemo($input: ActivateStudentDemoInput!) {\n  activateStudentDemo(input: $input) {\n    id\n    name\n    email\n    is_setup_completed\n    token\n    refresh_token\n  }\n}": types.ActivateStudentDemoDocument,
    "mutation AddCourseToCart($courseId: String!) {\n  addCourseToCart(courseId: $courseId) {\n    id\n  }\n}": types.AddCourseToCartDocument,
    "mutation CancelStudentAccountDeletion {\n  cancelStudentAccountDeletion {\n    token\n    refresh_token\n    account_status\n    name\n    email\n    is_setup_completed\n    organizations {\n      id\n      email\n    }\n  }\n}": types.CancelStudentAccountDeletionDocument,
    "mutation ChangePin($currentPin: String!, $newPin: String!) {\n  changePin(currentPin: $currentPin, newPin: $newPin) {\n    message\n  }\n}": types.ChangePinDocument,
    "mutation ChangeStudentPassword($currentPassword: String!, $newPassword: String!) {\n  changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {\n    message\n  }\n}": types.ChangeStudentPasswordDocument,
    "mutation CompleteSetup($categoryId: String!, $courseIds: [String!]!) {\n  completeSetup(categoryId: $categoryId, courseIds: $courseIds) {\n    id\n    is_setup_completed\n    email\n    name\n  }\n}": types.CompleteSetupDocument,
    "mutation CompleteStudentAccountValidation($email: String!, $validationCode: String!) {\n  completeStudentAccountValidation(\n    email: $email\n    validation_code: $validationCode\n  ) {\n    message\n  }\n}": types.CompleteStudentAccountValidationDocument,
    "mutation CreateCheckout($autoApproveSubscription: Boolean!, $checkoutFromCart: Boolean, $courseId: String) {\n  createCheckout(\n    autoApproveSubscription: $autoApproveSubscription\n    checkoutFromCart: $checkoutFromCart\n    courseId: $courseId\n  ) {\n    id\n  }\n}": types.CreateCheckoutDocument,
    "mutation EndTest($testId: String!) {\n  endTest(testId: $testId) {\n    id\n    status\n  }\n}": types.EndTestDocument,
    "mutation InitiatePayment($planId: String!, $children: [String!]!) {\n  initiatePayment(planId: $planId, children: $children) {\n    authorization_url\n    reference\n  }\n}": types.InitiatePaymentDocument,
    "mutation LoginChild($input: LoginChildInput!) {\n  loginChild(input: $input) {\n    id\n    full_name\n    class_level\n    target_exam\n    school_name\n    username\n    token\n    refresh_token\n    student {\n      id\n      name\n      email\n      is_setup_completed\n      organizations {\n        id\n        email\n      }\n    }\n  }\n}": types.LoginChildDocument,
    "mutation PauseTest($testId: String!) {\n  pauseTest(testId: $testId) {\n    id\n    status\n  }\n}": types.PauseTestDocument,
    "mutation RefreshStudentToken($refreshToken: String!) {\n  refreshStudentToken(refresh_token: $refreshToken) {\n    access_token\n  }\n}": types.RefreshStudentTokenDocument,
    "mutation RegisterStudent($name: String!, $email: String!, $password: String!) {\n  registerStudent(name: $name, email: $email, password: $password) {\n    message\n  }\n}": types.RegisterStudentDocument,
    "mutation RemoveCourseFromCart($courseId: String!) {\n  removeCourseFromCart(courseId: $courseId) {\n    id\n  }\n}": types.RemoveCourseFromCartDocument,
    "mutation RequestStudentAccountDeletion {\n  requestStudentAccountDeletion {\n    message\n    deletionScheduledFor\n    status\n  }\n}": types.RequestStudentAccountDeletionDocument,
    "mutation RequestStudentPasswordReset($email: String!) {\n  requestStudentPasswordReset(email: $email) {\n    message\n  }\n}": types.RequestStudentPasswordResetDocument,
    "mutation ResendAccountValidationCode($email: String!) {\n  resendAccountValidationCode(email: $email) {\n    message\n  }\n}": types.ResendAccountValidationCodeDocument,
    "mutation ResetStudentPassword($email: String!, $token: String!, $password: String!) {\n  resetStudentPassword(email: $email, token: $token, password: $password) {\n    message\n  }\n}": types.ResetStudentPasswordDocument,
    "mutation ResumeTest($testId: String!) {\n  resumeTest(testId: $testId) {\n    id\n    status\n  }\n}": types.ResumeTestDocument,
    "mutation StartAssignedTest($assignmentId: String!, $mode: TestModeType) {\n  startAssignedTest(assignmentId: $assignmentId, mode: $mode) {\n    id\n    status\n    course_id\n  }\n}": types.StartAssignedTestDocument,
    "mutation StartTest($suiteId: String!, $mode: TestModeType) {\n  startTest(suiteId: $suiteId, mode: $mode) {\n    id\n    status\n  }\n}": types.StartTestDocument,
    "mutation SubmitAnswer($testId: String!, $questionId: String!, $timeRange: String!, $answer: String!, $isFlagged: Boolean!) {\n  submitAnswer(\n    testId: $testId\n    questionId: $questionId\n    timeRange: $timeRange\n    answer: $answer\n    isFlagged: $isFlagged\n  ) {\n    answer_provided\n    hints_used\n    id\n    is_flagged\n    is_correct\n    is_marked\n    question_id\n  }\n}": types.SubmitAnswerDocument,
    "mutation VerifyStudentCancellationOtp($otp: String!) {\n  verifyCancellationOtp(otp: $otp) {\n    message\n  }\n}": types.VerifyStudentCancellationOtpDocument,
    "mutation VerifyChildUsername($input: VerifyChildUsernameInput!) {\n  verifyChildUsername(input: $input) {\n    temp_token\n  }\n}": types.VerifyChildUsernameDocument,
    "query GetActiveTest {\n  getActiveTest {\n    id\n    mode\n    status\n    course_id\n  }\n}": types.GetActiveTestDocument,
    "query GetAllAttemptedQuestions($testId: String!) {\n  getAllAttemptedQuestions(testId: $testId) {\n    answer_provided\n    question_id\n    is_flagged\n    is_correct\n    is_marked\n    question {\n      type\n    }\n  }\n}": types.GetAllAttemptedQuestionsDocument,
    "query GetCategoryCountdown($categoryId: String!) {\n  getCategoryCountdown(categoryId: $categoryId) {\n    categoryName\n    countdown\n    exam_duration_days\n  }\n}": types.GetCategoryCountdownDocument,
    "query GetCurrentStreakCount {\n  getCurrentStreakCount {\n    current_streak\n    best_streak\n  }\n}": types.GetCurrentStreakCountDocument,
    "query GetOrganizationCourse($courseId: String!) {\n  getOrganizationCourse(courseId: $courseId) {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    instructor {\n      id\n      email\n      name\n    }\n    level\n    price\n    title\n    is_subscribed\n    is_course_in_cart\n  }\n}": types.GetOrganizationCourseDocument,
    "query GetQuestion($testId: String!) {\n  getQuestion(testId: $testId) {\n    description\n    difficulty\n    estimated_time_in_ms\n    hints\n    id\n    options\n    question_number\n    solution_steps\n    tags\n    type\n  }\n}": types.GetQuestionDocument,
    "query GetStudentStats {\n  getStudentStats {\n    total_test_taken\n    total_test_taken_percentage_change\n    average_score\n    average_score_percentage_change\n    study_hours\n    weak_areas_count\n  }\n}": types.GetStudentStatsDocument,
    "query GetStudentSubscription {\n  getMyStudentSubscription {\n    id\n    status\n    started_at\n    expires_at\n    plan {\n      id\n      name\n      price\n      currency\n      interval\n      duration_days\n    }\n  }\n}": types.GetStudentSubscriptionDocument,
    "query GetSubscribedCourseDetails($courseId: String!) {\n  getSubscribedCourseDetails(courseId: $courseId) {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    level\n    price\n    title\n    instructor {\n      id\n      email\n      name\n    }\n    approved_version {\n      id\n      questions {\n        id\n        question_number\n        description\n        options\n        hints\n        estimated_time_in_ms\n        difficulty\n        correct_answer\n        solution_steps\n        tags\n        type\n        marks\n      }\n      test_suites {\n        id\n        description\n        keywords\n        title\n        difficulty\n        suite_type\n        questions {\n          id\n        }\n      }\n    }\n  }\n}": types.GetSubscribedCourseDetailsDocument,
    "query GetTestScoreHistory($testId: String) {\n  getTestScoreHistory(testId: $testId) {\n    test_id\n    course_title\n    score\n    date_taken\n  }\n}": types.GetTestScoreHistoryDocument,
    "query GetTest($testId: String!) {\n  getTest(testId: $testId) {\n    course_id\n    course_category\n    id\n    mode\n    status\n    submitted_answers {\n      id\n      answer_provided\n      hints_used\n      is_flagged\n      question_id\n      is_correct\n      is_marked\n      question {\n        id\n        marks\n        question_number\n        description\n        hints\n        solution_steps\n        options\n        type\n        tags\n        class_level\n        exam_year\n        correct_answer\n        difficulty\n        estimated_time_in_ms\n      }\n    }\n    test_suite {\n      questions {\n        id\n        marks\n        question_number\n        description\n        hints\n        solution_steps\n        options\n        type\n        tags\n        class_level\n        exam_year\n        correct_answer\n        difficulty\n        estimated_time_in_ms\n      }\n      title\n      id\n      difficulty\n      description\n    }\n    time_events {\n      type\n      recorded_at\n    }\n  }\n}": types.GetTestDocument,
    "query GetWeeklyInsight {\n  getWeeklyInsight {\n    title\n    description\n    suites {\n      suite_id\n      title\n      accuracy\n    }\n  }\n}": types.GetWeeklyInsightDocument,
    "query ListAttempts($searchTerm: String, $filter: AttemptFilterInput, $pagination: PaginationInput) {\n  listAttempts(searchTerm: $searchTerm, filter: $filter, pagination: $pagination) {\n    count\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n    edges {\n      node {\n        id\n        course_id\n        date_taken\n        course_title\n        correct\n        mode\n        score\n        status\n        time_taken\n        trend\n        wrong\n      }\n    }\n  }\n}": types.ListAttemptsDocument,
    "query ListCartCourses {\n  listCartCourses {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    instructor {\n      id\n      email\n      name\n    }\n    level\n    price\n    title\n  }\n}": types.ListCartCoursesDocument,
    "query ListCourseSuites($courseId: String!, $suiteTypes: [SuiteType!], $pagination: PaginationInput) {\n  listCourseSuites(\n    courseId: $courseId\n    suiteTypes: $suiteTypes\n    pagination: $pagination\n  ) {\n    edges {\n      node {\n        id\n        title\n        description\n        keywords\n        difficulty\n        suite_type\n        image_url\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    count\n  }\n}": types.ListCourseSuitesDocument,
    "query ListCoursesForOrganization($searchTerm: String, $pagination: PaginationInput) {\n  listCoursesForOrganization(searchTerm: $searchTerm, pagination: $pagination) {\n    count\n    edges {\n      node {\n        id\n        avatar_url\n        estimated_duration\n        domains\n        description\n        currency\n        inserted_at\n        is_subscribed\n        level\n        price\n        title\n        total_questions\n        updated_at\n        instructor {\n          id\n          name\n          email\n          status\n        }\n      }\n    }\n  }\n}": types.ListCoursesForOrganizationDocument,
    "query ListMyAssignments {\n  listMyAssignments {\n    id\n    status\n    assigned_at\n    completed_at\n    note\n    parent {\n      first_name\n      last_name\n      gender\n    }\n    test_suite {\n      id\n      title\n      description\n      difficulty\n    }\n    test {\n      id\n      status\n      course_id\n    }\n  }\n}": types.ListMyAssignmentsDocument,
    "query ListOrganizationCategories {\n  listOrganizationCategories {\n    id\n    name\n    courses {\n      id\n      level\n      price\n      title\n      domains\n      description\n      currency\n      avatar_url\n      is_mandatory\n    }\n  }\n}": types.ListOrganizationCategoriesDocument,
    "query ListOrganizationCourses($organizationId: String, $searchTerm: String, $filter: CourseFilterInput, $pagination: PaginationInput) {\n  listOrganizationCourses(\n    organizationId: $organizationId\n    searchTerm: $searchTerm\n    filter: $filter\n    pagination: $pagination\n  ) {\n    edges {\n      node {\n        id\n        avatar_url\n        currency\n        description\n        domains\n        is_subscribed\n        level\n        price\n        title\n        total_questions\n        estimated_duration\n        updated_at\n        inserted_at\n        approved_version {\n          id\n          status\n          inserted_at\n          updated_at\n          version_number\n          test_suites {\n            id\n            description\n            difficulty\n            keywords\n            suite_type\n            image_url\n            title\n          }\n        }\n      }\n    }\n  }\n}": types.ListOrganizationCoursesDocument,
    "query ListOrganizations($searchTerm: String, $pagination: PaginationInput) {\n  listOrganizations(searchTerm: $searchTerm, pagination: $pagination) {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n}": types.ListOrganizationsDocument,
    "query ListStudentSubscriptions {\n  listMyStudentSubscriptions {\n    id\n    status\n    started_at\n    expires_at\n    plan {\n      id\n      name\n      price\n      currency\n      interval\n      duration_days\n    }\n  }\n}": types.ListStudentSubscriptionsDocument,
    "query ListSubscriptionPlans {\n  listSubscriptionPlans {\n    id\n    plan_key\n    name\n    tagline\n    price\n    currency\n    interval\n    duration_days\n    features\n    billing_label\n  }\n}": types.ListSubscriptionPlansDocument,
    "query LoginStudent($email: String!, $password: String!) {\n  loginStudent(email: $email, password: $password) {\n    id\n    email\n    name\n    token\n    refresh_token\n    account_status\n    deletion_scheduled_for\n    is_setup_completed\n    organizations {\n      id\n      email\n    }\n  }\n}": types.LoginStudentDocument,
    "query StudentProfile {\n  studentProfile {\n    id\n    name\n    email\n    is_setup_completed\n    organizations {\n      id\n      email\n    }\n    subscribed_categories {\n      id\n      name\n    }\n  }\n}": types.StudentProfileDocument,
    "query StudentSubjectProgress($testId: String) {\n  studentSubjectProgress(testId: $testId) {\n    subject\n    total\n    correct\n    wrong\n    score\n  }\n}": types.StudentSubjectProgressDocument,
    "query StudentTestTopicProgress($testId: String!) {\n  studentTestTopicProgress(testId: $testId) {\n    topic\n    total\n    correct\n    wrong\n    score\n  }\n}": types.StudentTestTopicProgressDocument,
    "query TestStats($testId: String!) {\n  testStats(testId: $testId) {\n    submitted_answers {\n      answer_provided\n      hints_used\n      id\n      is_flagged\n      is_correct\n      is_marked\n      question {\n        correct_answer\n        description\n        difficulty\n        estimated_time_in_ms\n        hints\n        id\n        marks\n        options\n        question_number\n        solution_steps\n        tags\n        type\n      }\n      question_id\n    }\n    status\n    id\n    test_suite {\n      id\n      questions {\n        correct_answer\n        description\n        difficulty\n        estimated_time_in_ms\n        id\n        marks\n        options\n        question_number\n        solution_steps\n        tags\n        type\n        hints\n      }\n    }\n  }\n}": types.TestStatsDocument,
    "query WeakSubjectAreas($testId: String) {\n  weakSubjectAreas(testId: $testId) {\n    subject\n    error_count\n    total\n    accuracy\n    questions {\n      id\n      question_number\n      description\n      hints\n      solution_steps\n      options\n      type\n      tags\n      correct_answer\n      difficulty\n      estimated_time_in_ms\n    }\n  }\n}": types.WeakSubjectAreasDocument,
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
export function graphql(source: "mutation ActivateStudentDemo($input: ActivateStudentDemoInput!) {\n  activateStudentDemo(input: $input) {\n    id\n    name\n    email\n    is_setup_completed\n    token\n    refresh_token\n  }\n}"): (typeof documents)["mutation ActivateStudentDemo($input: ActivateStudentDemoInput!) {\n  activateStudentDemo(input: $input) {\n    id\n    name\n    email\n    is_setup_completed\n    token\n    refresh_token\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddCourseToCart($courseId: String!) {\n  addCourseToCart(courseId: $courseId) {\n    id\n  }\n}"): (typeof documents)["mutation AddCourseToCart($courseId: String!) {\n  addCourseToCart(courseId: $courseId) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CancelStudentAccountDeletion {\n  cancelStudentAccountDeletion {\n    token\n    refresh_token\n    account_status\n    name\n    email\n    is_setup_completed\n    organizations {\n      id\n      email\n    }\n  }\n}"): (typeof documents)["mutation CancelStudentAccountDeletion {\n  cancelStudentAccountDeletion {\n    token\n    refresh_token\n    account_status\n    name\n    email\n    is_setup_completed\n    organizations {\n      id\n      email\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangePin($currentPin: String!, $newPin: String!) {\n  changePin(currentPin: $currentPin, newPin: $newPin) {\n    message\n  }\n}"): (typeof documents)["mutation ChangePin($currentPin: String!, $newPin: String!) {\n  changePin(currentPin: $currentPin, newPin: $newPin) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangeStudentPassword($currentPassword: String!, $newPassword: String!) {\n  changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {\n    message\n  }\n}"): (typeof documents)["mutation ChangeStudentPassword($currentPassword: String!, $newPassword: String!) {\n  changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CompleteSetup($categoryId: String!, $courseIds: [String!]!) {\n  completeSetup(categoryId: $categoryId, courseIds: $courseIds) {\n    id\n    is_setup_completed\n    email\n    name\n  }\n}"): (typeof documents)["mutation CompleteSetup($categoryId: String!, $courseIds: [String!]!) {\n  completeSetup(categoryId: $categoryId, courseIds: $courseIds) {\n    id\n    is_setup_completed\n    email\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CompleteStudentAccountValidation($email: String!, $validationCode: String!) {\n  completeStudentAccountValidation(\n    email: $email\n    validation_code: $validationCode\n  ) {\n    message\n  }\n}"): (typeof documents)["mutation CompleteStudentAccountValidation($email: String!, $validationCode: String!) {\n  completeStudentAccountValidation(\n    email: $email\n    validation_code: $validationCode\n  ) {\n    message\n  }\n}"];
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
export function graphql(source: "mutation InitiatePayment($planId: String!, $children: [String!]!) {\n  initiatePayment(planId: $planId, children: $children) {\n    authorization_url\n    reference\n  }\n}"): (typeof documents)["mutation InitiatePayment($planId: String!, $children: [String!]!) {\n  initiatePayment(planId: $planId, children: $children) {\n    authorization_url\n    reference\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation LoginChild($input: LoginChildInput!) {\n  loginChild(input: $input) {\n    id\n    full_name\n    class_level\n    target_exam\n    school_name\n    username\n    token\n    refresh_token\n    student {\n      id\n      name\n      email\n      is_setup_completed\n      organizations {\n        id\n        email\n      }\n    }\n  }\n}"): (typeof documents)["mutation LoginChild($input: LoginChildInput!) {\n  loginChild(input: $input) {\n    id\n    full_name\n    class_level\n    target_exam\n    school_name\n    username\n    token\n    refresh_token\n    student {\n      id\n      name\n      email\n      is_setup_completed\n      organizations {\n        id\n        email\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation PauseTest($testId: String!) {\n  pauseTest(testId: $testId) {\n    id\n    status\n  }\n}"): (typeof documents)["mutation PauseTest($testId: String!) {\n  pauseTest(testId: $testId) {\n    id\n    status\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RefreshStudentToken($refreshToken: String!) {\n  refreshStudentToken(refresh_token: $refreshToken) {\n    access_token\n  }\n}"): (typeof documents)["mutation RefreshStudentToken($refreshToken: String!) {\n  refreshStudentToken(refresh_token: $refreshToken) {\n    access_token\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RegisterStudent($name: String!, $email: String!, $password: String!) {\n  registerStudent(name: $name, email: $email, password: $password) {\n    message\n  }\n}"): (typeof documents)["mutation RegisterStudent($name: String!, $email: String!, $password: String!) {\n  registerStudent(name: $name, email: $email, password: $password) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveCourseFromCart($courseId: String!) {\n  removeCourseFromCart(courseId: $courseId) {\n    id\n  }\n}"): (typeof documents)["mutation RemoveCourseFromCart($courseId: String!) {\n  removeCourseFromCart(courseId: $courseId) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RequestStudentAccountDeletion {\n  requestStudentAccountDeletion {\n    message\n    deletionScheduledFor\n    status\n  }\n}"): (typeof documents)["mutation RequestStudentAccountDeletion {\n  requestStudentAccountDeletion {\n    message\n    deletionScheduledFor\n    status\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RequestStudentPasswordReset($email: String!) {\n  requestStudentPasswordReset(email: $email) {\n    message\n  }\n}"): (typeof documents)["mutation RequestStudentPasswordReset($email: String!) {\n  requestStudentPasswordReset(email: $email) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ResendAccountValidationCode($email: String!) {\n  resendAccountValidationCode(email: $email) {\n    message\n  }\n}"): (typeof documents)["mutation ResendAccountValidationCode($email: String!) {\n  resendAccountValidationCode(email: $email) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ResetStudentPassword($email: String!, $token: String!, $password: String!) {\n  resetStudentPassword(email: $email, token: $token, password: $password) {\n    message\n  }\n}"): (typeof documents)["mutation ResetStudentPassword($email: String!, $token: String!, $password: String!) {\n  resetStudentPassword(email: $email, token: $token, password: $password) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ResumeTest($testId: String!) {\n  resumeTest(testId: $testId) {\n    id\n    status\n  }\n}"): (typeof documents)["mutation ResumeTest($testId: String!) {\n  resumeTest(testId: $testId) {\n    id\n    status\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation StartAssignedTest($assignmentId: String!, $mode: TestModeType) {\n  startAssignedTest(assignmentId: $assignmentId, mode: $mode) {\n    id\n    status\n    course_id\n  }\n}"): (typeof documents)["mutation StartAssignedTest($assignmentId: String!, $mode: TestModeType) {\n  startAssignedTest(assignmentId: $assignmentId, mode: $mode) {\n    id\n    status\n    course_id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation StartTest($suiteId: String!, $mode: TestModeType) {\n  startTest(suiteId: $suiteId, mode: $mode) {\n    id\n    status\n  }\n}"): (typeof documents)["mutation StartTest($suiteId: String!, $mode: TestModeType) {\n  startTest(suiteId: $suiteId, mode: $mode) {\n    id\n    status\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SubmitAnswer($testId: String!, $questionId: String!, $timeRange: String!, $answer: String!, $isFlagged: Boolean!) {\n  submitAnswer(\n    testId: $testId\n    questionId: $questionId\n    timeRange: $timeRange\n    answer: $answer\n    isFlagged: $isFlagged\n  ) {\n    answer_provided\n    hints_used\n    id\n    is_flagged\n    is_correct\n    is_marked\n    question_id\n  }\n}"): (typeof documents)["mutation SubmitAnswer($testId: String!, $questionId: String!, $timeRange: String!, $answer: String!, $isFlagged: Boolean!) {\n  submitAnswer(\n    testId: $testId\n    questionId: $questionId\n    timeRange: $timeRange\n    answer: $answer\n    isFlagged: $isFlagged\n  ) {\n    answer_provided\n    hints_used\n    id\n    is_flagged\n    is_correct\n    is_marked\n    question_id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation VerifyStudentCancellationOtp($otp: String!) {\n  verifyCancellationOtp(otp: $otp) {\n    message\n  }\n}"): (typeof documents)["mutation VerifyStudentCancellationOtp($otp: String!) {\n  verifyCancellationOtp(otp: $otp) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation VerifyChildUsername($input: VerifyChildUsernameInput!) {\n  verifyChildUsername(input: $input) {\n    temp_token\n  }\n}"): (typeof documents)["mutation VerifyChildUsername($input: VerifyChildUsernameInput!) {\n  verifyChildUsername(input: $input) {\n    temp_token\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetActiveTest {\n  getActiveTest {\n    id\n    mode\n    status\n    course_id\n  }\n}"): (typeof documents)["query GetActiveTest {\n  getActiveTest {\n    id\n    mode\n    status\n    course_id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetAllAttemptedQuestions($testId: String!) {\n  getAllAttemptedQuestions(testId: $testId) {\n    answer_provided\n    question_id\n    is_flagged\n    is_correct\n    is_marked\n    question {\n      type\n    }\n  }\n}"): (typeof documents)["query GetAllAttemptedQuestions($testId: String!) {\n  getAllAttemptedQuestions(testId: $testId) {\n    answer_provided\n    question_id\n    is_flagged\n    is_correct\n    is_marked\n    question {\n      type\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCategoryCountdown($categoryId: String!) {\n  getCategoryCountdown(categoryId: $categoryId) {\n    categoryName\n    countdown\n    exam_duration_days\n  }\n}"): (typeof documents)["query GetCategoryCountdown($categoryId: String!) {\n  getCategoryCountdown(categoryId: $categoryId) {\n    categoryName\n    countdown\n    exam_duration_days\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCurrentStreakCount {\n  getCurrentStreakCount {\n    current_streak\n    best_streak\n  }\n}"): (typeof documents)["query GetCurrentStreakCount {\n  getCurrentStreakCount {\n    current_streak\n    best_streak\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetOrganizationCourse($courseId: String!) {\n  getOrganizationCourse(courseId: $courseId) {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    instructor {\n      id\n      email\n      name\n    }\n    level\n    price\n    title\n    is_subscribed\n    is_course_in_cart\n  }\n}"): (typeof documents)["query GetOrganizationCourse($courseId: String!) {\n  getOrganizationCourse(courseId: $courseId) {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    instructor {\n      id\n      email\n      name\n    }\n    level\n    price\n    title\n    is_subscribed\n    is_course_in_cart\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetQuestion($testId: String!) {\n  getQuestion(testId: $testId) {\n    description\n    difficulty\n    estimated_time_in_ms\n    hints\n    id\n    options\n    question_number\n    solution_steps\n    tags\n    type\n  }\n}"): (typeof documents)["query GetQuestion($testId: String!) {\n  getQuestion(testId: $testId) {\n    description\n    difficulty\n    estimated_time_in_ms\n    hints\n    id\n    options\n    question_number\n    solution_steps\n    tags\n    type\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetStudentStats {\n  getStudentStats {\n    total_test_taken\n    total_test_taken_percentage_change\n    average_score\n    average_score_percentage_change\n    study_hours\n    weak_areas_count\n  }\n}"): (typeof documents)["query GetStudentStats {\n  getStudentStats {\n    total_test_taken\n    total_test_taken_percentage_change\n    average_score\n    average_score_percentage_change\n    study_hours\n    weak_areas_count\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetStudentSubscription {\n  getMyStudentSubscription {\n    id\n    status\n    started_at\n    expires_at\n    plan {\n      id\n      name\n      price\n      currency\n      interval\n      duration_days\n    }\n  }\n}"): (typeof documents)["query GetStudentSubscription {\n  getMyStudentSubscription {\n    id\n    status\n    started_at\n    expires_at\n    plan {\n      id\n      name\n      price\n      currency\n      interval\n      duration_days\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetSubscribedCourseDetails($courseId: String!) {\n  getSubscribedCourseDetails(courseId: $courseId) {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    level\n    price\n    title\n    instructor {\n      id\n      email\n      name\n    }\n    approved_version {\n      id\n      questions {\n        id\n        question_number\n        description\n        options\n        hints\n        estimated_time_in_ms\n        difficulty\n        correct_answer\n        solution_steps\n        tags\n        type\n        marks\n      }\n      test_suites {\n        id\n        description\n        keywords\n        title\n        difficulty\n        suite_type\n        questions {\n          id\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query GetSubscribedCourseDetails($courseId: String!) {\n  getSubscribedCourseDetails(courseId: $courseId) {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    level\n    price\n    title\n    instructor {\n      id\n      email\n      name\n    }\n    approved_version {\n      id\n      questions {\n        id\n        question_number\n        description\n        options\n        hints\n        estimated_time_in_ms\n        difficulty\n        correct_answer\n        solution_steps\n        tags\n        type\n        marks\n      }\n      test_suites {\n        id\n        description\n        keywords\n        title\n        difficulty\n        suite_type\n        questions {\n          id\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetTestScoreHistory($testId: String) {\n  getTestScoreHistory(testId: $testId) {\n    test_id\n    course_title\n    score\n    date_taken\n  }\n}"): (typeof documents)["query GetTestScoreHistory($testId: String) {\n  getTestScoreHistory(testId: $testId) {\n    test_id\n    course_title\n    score\n    date_taken\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetTest($testId: String!) {\n  getTest(testId: $testId) {\n    course_id\n    course_category\n    id\n    mode\n    status\n    submitted_answers {\n      id\n      answer_provided\n      hints_used\n      is_flagged\n      question_id\n      is_correct\n      is_marked\n      question {\n        id\n        marks\n        question_number\n        description\n        hints\n        solution_steps\n        options\n        type\n        tags\n        class_level\n        exam_year\n        correct_answer\n        difficulty\n        estimated_time_in_ms\n      }\n    }\n    test_suite {\n      questions {\n        id\n        marks\n        question_number\n        description\n        hints\n        solution_steps\n        options\n        type\n        tags\n        class_level\n        exam_year\n        correct_answer\n        difficulty\n        estimated_time_in_ms\n      }\n      title\n      id\n      difficulty\n      description\n    }\n    time_events {\n      type\n      recorded_at\n    }\n  }\n}"): (typeof documents)["query GetTest($testId: String!) {\n  getTest(testId: $testId) {\n    course_id\n    course_category\n    id\n    mode\n    status\n    submitted_answers {\n      id\n      answer_provided\n      hints_used\n      is_flagged\n      question_id\n      is_correct\n      is_marked\n      question {\n        id\n        marks\n        question_number\n        description\n        hints\n        solution_steps\n        options\n        type\n        tags\n        class_level\n        exam_year\n        correct_answer\n        difficulty\n        estimated_time_in_ms\n      }\n    }\n    test_suite {\n      questions {\n        id\n        marks\n        question_number\n        description\n        hints\n        solution_steps\n        options\n        type\n        tags\n        class_level\n        exam_year\n        correct_answer\n        difficulty\n        estimated_time_in_ms\n      }\n      title\n      id\n      difficulty\n      description\n    }\n    time_events {\n      type\n      recorded_at\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetWeeklyInsight {\n  getWeeklyInsight {\n    title\n    description\n    suites {\n      suite_id\n      title\n      accuracy\n    }\n  }\n}"): (typeof documents)["query GetWeeklyInsight {\n  getWeeklyInsight {\n    title\n    description\n    suites {\n      suite_id\n      title\n      accuracy\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListAttempts($searchTerm: String, $filter: AttemptFilterInput, $pagination: PaginationInput) {\n  listAttempts(searchTerm: $searchTerm, filter: $filter, pagination: $pagination) {\n    count\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n    edges {\n      node {\n        id\n        course_id\n        date_taken\n        course_title\n        correct\n        mode\n        score\n        status\n        time_taken\n        trend\n        wrong\n      }\n    }\n  }\n}"): (typeof documents)["query ListAttempts($searchTerm: String, $filter: AttemptFilterInput, $pagination: PaginationInput) {\n  listAttempts(searchTerm: $searchTerm, filter: $filter, pagination: $pagination) {\n    count\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n    edges {\n      node {\n        id\n        course_id\n        date_taken\n        course_title\n        correct\n        mode\n        score\n        status\n        time_taken\n        trend\n        wrong\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListCartCourses {\n  listCartCourses {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    instructor {\n      id\n      email\n      name\n    }\n    level\n    price\n    title\n  }\n}"): (typeof documents)["query ListCartCourses {\n  listCartCourses {\n    id\n    avatar_url\n    currency\n    description\n    domains\n    instructor {\n      id\n      email\n      name\n    }\n    level\n    price\n    title\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListCourseSuites($courseId: String!, $suiteTypes: [SuiteType!], $pagination: PaginationInput) {\n  listCourseSuites(\n    courseId: $courseId\n    suiteTypes: $suiteTypes\n    pagination: $pagination\n  ) {\n    edges {\n      node {\n        id\n        title\n        description\n        keywords\n        difficulty\n        suite_type\n        image_url\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    count\n  }\n}"): (typeof documents)["query ListCourseSuites($courseId: String!, $suiteTypes: [SuiteType!], $pagination: PaginationInput) {\n  listCourseSuites(\n    courseId: $courseId\n    suiteTypes: $suiteTypes\n    pagination: $pagination\n  ) {\n    edges {\n      node {\n        id\n        title\n        description\n        keywords\n        difficulty\n        suite_type\n        image_url\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    count\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListCoursesForOrganization($searchTerm: String, $pagination: PaginationInput) {\n  listCoursesForOrganization(searchTerm: $searchTerm, pagination: $pagination) {\n    count\n    edges {\n      node {\n        id\n        avatar_url\n        estimated_duration\n        domains\n        description\n        currency\n        inserted_at\n        is_subscribed\n        level\n        price\n        title\n        total_questions\n        updated_at\n        instructor {\n          id\n          name\n          email\n          status\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query ListCoursesForOrganization($searchTerm: String, $pagination: PaginationInput) {\n  listCoursesForOrganization(searchTerm: $searchTerm, pagination: $pagination) {\n    count\n    edges {\n      node {\n        id\n        avatar_url\n        estimated_duration\n        domains\n        description\n        currency\n        inserted_at\n        is_subscribed\n        level\n        price\n        title\n        total_questions\n        updated_at\n        instructor {\n          id\n          name\n          email\n          status\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListMyAssignments {\n  listMyAssignments {\n    id\n    status\n    assigned_at\n    completed_at\n    note\n    parent {\n      first_name\n      last_name\n      gender\n    }\n    test_suite {\n      id\n      title\n      description\n      difficulty\n    }\n    test {\n      id\n      status\n      course_id\n    }\n  }\n}"): (typeof documents)["query ListMyAssignments {\n  listMyAssignments {\n    id\n    status\n    assigned_at\n    completed_at\n    note\n    parent {\n      first_name\n      last_name\n      gender\n    }\n    test_suite {\n      id\n      title\n      description\n      difficulty\n    }\n    test {\n      id\n      status\n      course_id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListOrganizationCategories {\n  listOrganizationCategories {\n    id\n    name\n    courses {\n      id\n      level\n      price\n      title\n      domains\n      description\n      currency\n      avatar_url\n      is_mandatory\n    }\n  }\n}"): (typeof documents)["query ListOrganizationCategories {\n  listOrganizationCategories {\n    id\n    name\n    courses {\n      id\n      level\n      price\n      title\n      domains\n      description\n      currency\n      avatar_url\n      is_mandatory\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListOrganizationCourses($organizationId: String, $searchTerm: String, $filter: CourseFilterInput, $pagination: PaginationInput) {\n  listOrganizationCourses(\n    organizationId: $organizationId\n    searchTerm: $searchTerm\n    filter: $filter\n    pagination: $pagination\n  ) {\n    edges {\n      node {\n        id\n        avatar_url\n        currency\n        description\n        domains\n        is_subscribed\n        level\n        price\n        title\n        total_questions\n        estimated_duration\n        updated_at\n        inserted_at\n        approved_version {\n          id\n          status\n          inserted_at\n          updated_at\n          version_number\n          test_suites {\n            id\n            description\n            difficulty\n            keywords\n            suite_type\n            image_url\n            title\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query ListOrganizationCourses($organizationId: String, $searchTerm: String, $filter: CourseFilterInput, $pagination: PaginationInput) {\n  listOrganizationCourses(\n    organizationId: $organizationId\n    searchTerm: $searchTerm\n    filter: $filter\n    pagination: $pagination\n  ) {\n    edges {\n      node {\n        id\n        avatar_url\n        currency\n        description\n        domains\n        is_subscribed\n        level\n        price\n        title\n        total_questions\n        estimated_duration\n        updated_at\n        inserted_at\n        approved_version {\n          id\n          status\n          inserted_at\n          updated_at\n          version_number\n          test_suites {\n            id\n            description\n            difficulty\n            keywords\n            suite_type\n            image_url\n            title\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListOrganizations($searchTerm: String, $pagination: PaginationInput) {\n  listOrganizations(searchTerm: $searchTerm, pagination: $pagination) {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n}"): (typeof documents)["query ListOrganizations($searchTerm: String, $pagination: PaginationInput) {\n  listOrganizations(searchTerm: $searchTerm, pagination: $pagination) {\n    edges {\n      node {\n        name\n        id\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListStudentSubscriptions {\n  listMyStudentSubscriptions {\n    id\n    status\n    started_at\n    expires_at\n    plan {\n      id\n      name\n      price\n      currency\n      interval\n      duration_days\n    }\n  }\n}"): (typeof documents)["query ListStudentSubscriptions {\n  listMyStudentSubscriptions {\n    id\n    status\n    started_at\n    expires_at\n    plan {\n      id\n      name\n      price\n      currency\n      interval\n      duration_days\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ListSubscriptionPlans {\n  listSubscriptionPlans {\n    id\n    plan_key\n    name\n    tagline\n    price\n    currency\n    interval\n    duration_days\n    features\n    billing_label\n  }\n}"): (typeof documents)["query ListSubscriptionPlans {\n  listSubscriptionPlans {\n    id\n    plan_key\n    name\n    tagline\n    price\n    currency\n    interval\n    duration_days\n    features\n    billing_label\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query LoginStudent($email: String!, $password: String!) {\n  loginStudent(email: $email, password: $password) {\n    id\n    email\n    name\n    token\n    refresh_token\n    account_status\n    deletion_scheduled_for\n    is_setup_completed\n    organizations {\n      id\n      email\n    }\n  }\n}"): (typeof documents)["query LoginStudent($email: String!, $password: String!) {\n  loginStudent(email: $email, password: $password) {\n    id\n    email\n    name\n    token\n    refresh_token\n    account_status\n    deletion_scheduled_for\n    is_setup_completed\n    organizations {\n      id\n      email\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query StudentProfile {\n  studentProfile {\n    id\n    name\n    email\n    is_setup_completed\n    organizations {\n      id\n      email\n    }\n    subscribed_categories {\n      id\n      name\n    }\n  }\n}"): (typeof documents)["query StudentProfile {\n  studentProfile {\n    id\n    name\n    email\n    is_setup_completed\n    organizations {\n      id\n      email\n    }\n    subscribed_categories {\n      id\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query StudentSubjectProgress($testId: String) {\n  studentSubjectProgress(testId: $testId) {\n    subject\n    total\n    correct\n    wrong\n    score\n  }\n}"): (typeof documents)["query StudentSubjectProgress($testId: String) {\n  studentSubjectProgress(testId: $testId) {\n    subject\n    total\n    correct\n    wrong\n    score\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query StudentTestTopicProgress($testId: String!) {\n  studentTestTopicProgress(testId: $testId) {\n    topic\n    total\n    correct\n    wrong\n    score\n  }\n}"): (typeof documents)["query StudentTestTopicProgress($testId: String!) {\n  studentTestTopicProgress(testId: $testId) {\n    topic\n    total\n    correct\n    wrong\n    score\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query TestStats($testId: String!) {\n  testStats(testId: $testId) {\n    submitted_answers {\n      answer_provided\n      hints_used\n      id\n      is_flagged\n      is_correct\n      is_marked\n      question {\n        correct_answer\n        description\n        difficulty\n        estimated_time_in_ms\n        hints\n        id\n        marks\n        options\n        question_number\n        solution_steps\n        tags\n        type\n      }\n      question_id\n    }\n    status\n    id\n    test_suite {\n      id\n      questions {\n        correct_answer\n        description\n        difficulty\n        estimated_time_in_ms\n        id\n        marks\n        options\n        question_number\n        solution_steps\n        tags\n        type\n        hints\n      }\n    }\n  }\n}"): (typeof documents)["query TestStats($testId: String!) {\n  testStats(testId: $testId) {\n    submitted_answers {\n      answer_provided\n      hints_used\n      id\n      is_flagged\n      is_correct\n      is_marked\n      question {\n        correct_answer\n        description\n        difficulty\n        estimated_time_in_ms\n        hints\n        id\n        marks\n        options\n        question_number\n        solution_steps\n        tags\n        type\n      }\n      question_id\n    }\n    status\n    id\n    test_suite {\n      id\n      questions {\n        correct_answer\n        description\n        difficulty\n        estimated_time_in_ms\n        id\n        marks\n        options\n        question_number\n        solution_steps\n        tags\n        type\n        hints\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query WeakSubjectAreas($testId: String) {\n  weakSubjectAreas(testId: $testId) {\n    subject\n    error_count\n    total\n    accuracy\n    questions {\n      id\n      question_number\n      description\n      hints\n      solution_steps\n      options\n      type\n      tags\n      correct_answer\n      difficulty\n      estimated_time_in_ms\n    }\n  }\n}"): (typeof documents)["query WeakSubjectAreas($testId: String) {\n  weakSubjectAreas(testId: $testId) {\n    subject\n    error_count\n    total\n    accuracy\n    questions {\n      id\n      question_number\n      description\n      hints\n      solution_steps\n      options\n      type\n      tags\n      correct_answer\n      difficulty\n      estimated_time_in_ms\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;