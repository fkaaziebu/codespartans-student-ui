/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Admin = {
  __typename?: 'Admin';
  assigned_course_versions_for_review?: Maybe<Array<Version>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
};

export type AdminConnection = {
  __typename?: 'AdminConnection';
  count: Scalars['Int']['output'];
  edges: Array<AdminResponseEdge>;
  pageInfo: PageInfo;
};

export type AdminLoginResponse = {
  __typename?: 'AdminLoginResponse';
  assigned_course_versions_for_review?: Maybe<Array<Version>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  token: Scalars['String']['output'];
};

export type AdminResponse = {
  __typename?: 'AdminResponse';
  assigned_course_versions_for_review?: Maybe<Array<Version>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  total_approved_course_versions: Scalars['Float']['output'];
  total_course_versions: Scalars['Float']['output'];
};

export type AdminResponseEdge = {
  __typename?: 'AdminResponseEdge';
  cursor: Scalars['String']['output'];
  node: AdminResponse;
};

export type Cart = {
  __typename?: 'Cart';
  categories?: Maybe<Array<Category>>;
  courses?: Maybe<Array<Course>>;
  id: Scalars['ID']['output'];
  student?: Maybe<Student>;
};

export type Category = {
  __typename?: 'Category';
  avatar_url: Scalars['String']['output'];
  courses?: Maybe<Array<Course>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  students?: Maybe<Array<Student>>;
};

export type CategoryInfoInput = {
  avatar_url: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Checkout = {
  __typename?: 'Checkout';
  categories?: Maybe<Array<Category>>;
  courses?: Maybe<Array<Course>>;
  id: Scalars['ID']['output'];
  student?: Maybe<Student>;
};

export type Coupon = {
  __typename?: 'Coupon';
  courses?: Maybe<Array<Course>>;
  id: Scalars['ID']['output'];
  organization?: Maybe<Organization>;
};

export type Course = {
  __typename?: 'Course';
  approved_version?: Maybe<Version>;
  avatar_url: Scalars['String']['output'];
  categories?: Maybe<Array<Category>>;
  coupons?: Maybe<Array<Coupon>>;
  currency: CurrencyType;
  description: Scalars['String']['output'];
  domains: Array<DomainType>;
  id: Scalars['ID']['output'];
  instructor?: Maybe<Instructor>;
  level: LevelType;
  organization?: Maybe<Organization>;
  price: Scalars['Float']['output'];
  subscribed_students?: Maybe<Array<Student>>;
  title: Scalars['String']['output'];
  versions?: Maybe<Array<Version>>;
};

export type CourseConnection = {
  __typename?: 'CourseConnection';
  count: Scalars['Int']['output'];
  edges: Array<CourseResponseEdge>;
  pageInfo: PageInfo;
};

export type CourseInfoInput = {
  avatar_url: Scalars['String']['input'];
  currency: CurrencyType;
  description: Scalars['String']['input'];
  domains: Array<DomainType>;
  level: LevelType;
  price: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type CourseResponse = {
  __typename?: 'CourseResponse';
  approved_version?: Maybe<Version>;
  avatar_url: Scalars['String']['output'];
  categories?: Maybe<Array<Category>>;
  coupons?: Maybe<Array<Coupon>>;
  currency: CurrencyType;
  description: Scalars['String']['output'];
  domains: Array<DomainType>;
  estimated_duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  instructor?: Maybe<Instructor>;
  is_subscribed: Scalars['Boolean']['output'];
  level: LevelType;
  organization?: Maybe<Organization>;
  price: Scalars['Float']['output'];
  subscribed_students?: Maybe<Array<Student>>;
  title: Scalars['String']['output'];
  total_questions: Scalars['Float']['output'];
  versions?: Maybe<Array<Version>>;
};

export type CourseResponseEdge = {
  __typename?: 'CourseResponseEdge';
  cursor: Scalars['String']['output'];
  node: CourseResponse;
};

/** Currency */
export enum CurrencyType {
  Eur = 'EUR',
  Usd = 'USD'
}

/** Course domains */
export enum DomainType {
  English = 'ENGLISH',
  Mathematics = 'MATHEMATICS',
  Science = 'SCIENCE'
}

export type Instructor = {
  __typename?: 'Instructor';
  created_courses?: Maybe<Array<Course>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizations?: Maybe<Array<Organization>>;
};

export type InstructorConnection = {
  __typename?: 'InstructorConnection';
  count: Scalars['Int']['output'];
  edges: Array<InstructorResponseEdge>;
  pageInfo: PageInfo;
};

export type InstructorLoginResponse = {
  __typename?: 'InstructorLoginResponse';
  created_courses?: Maybe<Array<Course>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizations?: Maybe<Array<Organization>>;
  token: Scalars['String']['output'];
};

export type InstructorResponse = {
  __typename?: 'InstructorResponse';
  created_courses?: Maybe<Array<Course>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizations?: Maybe<Array<Organization>>;
  total_approved_courses: Scalars['Float']['output'];
  total_created_courses: Scalars['Float']['output'];
  total_requested_reviews: Scalars['Float']['output'];
};

export type InstructorResponseEdge = {
  __typename?: 'InstructorResponseEdge';
  cursor: Scalars['String']['output'];
  node: InstructorResponse;
};

export type Issue = {
  __typename?: 'Issue';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  response?: Maybe<Scalars['String']['output']>;
  review?: Maybe<Review>;
  status: IssueStatusType;
};

export type IssueInfoInput = {
  description: Scalars['String']['input'];
};

/** Issue status */
export enum IssueStatusType {
  Closed = 'CLOSED',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN',
  Resolved = 'RESOLVED'
}

/** Course level */
export enum LevelType {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Intermediate = 'INTERMEDIATE'
}

export type Mutation = {
  __typename?: 'Mutation';
  addCategoryToCart: Cart;
  addCourseToCart: Cart;
  addCourseVersion: Version;
  addCourseVersionReview: Review;
  addCoursesToCategory: Category;
  addQuestionsToCourseVersion: Version;
  addReviewIssue: Issue;
  approveCourseVersion: Version;
  assignCourseVersionForReview: Version;
  closeIssue: Issue;
  closeReview: Review;
  createCategory: Category;
  createCheckout: Checkout;
  createCourse: Course;
  endTest: Test;
  pauseTest: Test;
  registerAdmin: Admin;
  registerInstructor: Instructor;
  registerOrganization: RegisterResponse;
  registerStudent: RegisterResponse;
  requestCourseVersionReview: ReviewRequest;
  resumeTest: Test;
  startTest: Test;
  submitAnswer: SubmittedAnswer;
  updateCourse: Course;
  updateIssue: Issue;
  updateQuestion: Question;
};


export type MutationAddCategoryToCartArgs = {
  categoryId: Scalars['String']['input'];
};


export type MutationAddCourseToCartArgs = {
  courseId: Scalars['String']['input'];
};


export type MutationAddCourseVersionArgs = {
  courseId: Scalars['String']['input'];
};


export type MutationAddCourseVersionReviewArgs = {
  reviewInfo: ReviewInfoInput;
  versionId: Scalars['String']['input'];
};


export type MutationAddCoursesToCategoryArgs = {
  categoryId: Scalars['String']['input'];
  courseIds: Array<Scalars['String']['input']>;
};


export type MutationAddQuestionsToCourseVersionArgs = {
  questions: Array<QuestionInput>;
  suiteDescription: Scalars['String']['input'];
  suiteKeywords: Array<Scalars['String']['input']>;
  suiteTitle: Scalars['String']['input'];
  versionId: Scalars['String']['input'];
};


export type MutationAddReviewIssueArgs = {
  issueInfo: IssueInfoInput;
  reviewId: Scalars['String']['input'];
};


export type MutationApproveCourseVersionArgs = {
  versionId: Scalars['String']['input'];
};


export type MutationAssignCourseVersionForReviewArgs = {
  adminId: Scalars['String']['input'];
  versionId: Scalars['String']['input'];
};


export type MutationCloseIssueArgs = {
  issueId: Scalars['String']['input'];
};


export type MutationCloseReviewArgs = {
  reviewId: Scalars['String']['input'];
};


export type MutationCreateCategoryArgs = {
  categoryInfo: CategoryInfoInput;
};


export type MutationCreateCheckoutArgs = {
  autoApproveSubscription: Scalars['Boolean']['input'];
  checkoutFromCart?: InputMaybe<Scalars['Boolean']['input']>;
  courseId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateCourseArgs = {
  courseInfo: CourseInfoInput;
  organizationId: Scalars['String']['input'];
};


export type MutationEndTestArgs = {
  testId: Scalars['String']['input'];
};


export type MutationPauseTestArgs = {
  testId: Scalars['String']['input'];
};


export type MutationRegisterAdminArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterInstructorArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterOrganizationArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterStudentArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRequestCourseVersionReviewArgs = {
  versionId: Scalars['String']['input'];
};


export type MutationResumeTestArgs = {
  testId: Scalars['String']['input'];
};


export type MutationStartTestArgs = {
  suiteId: Scalars['String']['input'];
};


export type MutationSubmitAnswerArgs = {
  answer: Scalars['String']['input'];
  questionId: Scalars['String']['input'];
  testId: Scalars['String']['input'];
  timeRange: Scalars['String']['input'];
};


export type MutationUpdateCourseArgs = {
  courseId: Scalars['String']['input'];
  courseInfo: UpdateCourseInfoInput;
};


export type MutationUpdateIssueArgs = {
  issueId: Scalars['String']['input'];
  issueStatus: IssueStatusType;
  response: Scalars['String']['input'];
};


export type MutationUpdateQuestionArgs = {
  question: QuestionInput;
  questionId: Scalars['String']['input'];
};

export type Organization = {
  __typename?: 'Organization';
  admins?: Maybe<Array<Admin>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  instructors?: Maybe<Array<Instructor>>;
  name: Scalars['String']['output'];
  organizational_categories?: Maybe<Array<Category>>;
  organizational_coupons?: Maybe<Array<Coupon>>;
  organizational_courses?: Maybe<Array<Course>>;
  requested_reviews?: Maybe<Array<ReviewRequest>>;
  students?: Maybe<Array<Student>>;
};

export type OrganizationConnection = {
  __typename?: 'OrganizationConnection';
  count: Scalars['Int']['output'];
  edges: Array<OrganizationTypeClassEdge>;
  pageInfo: PageInfo;
};

export type OrganizationLoginResponse = {
  __typename?: 'OrganizationLoginResponse';
  admins?: Maybe<Array<Admin>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  instructors?: Maybe<Array<Instructor>>;
  name: Scalars['String']['output'];
  organizational_categories?: Maybe<Array<Category>>;
  organizational_coupons?: Maybe<Array<Coupon>>;
  organizational_courses?: Maybe<Array<Course>>;
  requested_reviews?: Maybe<Array<ReviewRequest>>;
  students?: Maybe<Array<Student>>;
  token: Scalars['String']['output'];
};

export type OrganizationTypeClassEdge = {
  __typename?: 'OrganizationTypeClassEdge';
  cursor: Scalars['String']['output'];
  node: Organization;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PaginationInput = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getCourse: Course;
  getCourseVersion: VersionResponse;
  getInstructorCourseVersion: VersionResponse;
  getInstructorVersionReview: Review;
  getOrganizationCourse: Course;
  getQuestion: Question;
  getStats: StatsResponse;
  getSubscribedCourseDetails: Course;
  getVersionReview: Review;
  listAdmins: AdminConnection;
  listAssignedVersions: VersionConnection;
  listCourses: CourseConnection;
  listInstructorQuestionsForVersion: QuestionConnection;
  listInstructors: InstructorConnection;
  listOrganizationCourses: CourseConnection;
  listOrganizations: OrganizationConnection;
  listQuestionsForVersion: QuestionConnection;
  listRequestedReviews: RequestedReviewConnection;
  loginAdmin: AdminLoginResponse;
  loginInstructor: InstructorLoginResponse;
  loginOrganization: OrganizationLoginResponse;
  loginStudent: StudentLoginResponse;
};


export type QueryGetCourseArgs = {
  courseId: Scalars['String']['input'];
};


export type QueryGetCourseVersionArgs = {
  versionId: Scalars['String']['input'];
};


export type QueryGetInstructorCourseVersionArgs = {
  versionId: Scalars['String']['input'];
};


export type QueryGetInstructorVersionReviewArgs = {
  reviewId: Scalars['String']['input'];
};


export type QueryGetOrganizationCourseArgs = {
  courseId: Scalars['String']['input'];
};


export type QueryGetQuestionArgs = {
  testId: Scalars['String']['input'];
};


export type QueryGetSubscribedCourseDetailsArgs = {
  courseId: Scalars['String']['input'];
};


export type QueryGetVersionReviewArgs = {
  reviewId: Scalars['String']['input'];
};


export type QueryListAdminsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListCoursesArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListInstructorQuestionsForVersionArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  versionId: Scalars['String']['input'];
};


export type QueryListInstructorsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListOrganizationCoursesArgs = {
  organizationId: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListOrganizationsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListQuestionsForVersionArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  versionId: Scalars['String']['input'];
};


export type QueryListRequestedReviewsArgs = {
  filter?: InputMaybe<RequestedReviewFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryLoginAdminArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryLoginInstructorArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryLoginOrganizationArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryLoginStudentArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Question = {
  __typename?: 'Question';
  correct_answer: Scalars['String']['output'];
  description: Scalars['String']['output'];
  difficulty: QuestionDifficultyType;
  estimated_time_in_ms: Scalars['Float']['output'];
  hints: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  options?: Maybe<Array<Scalars['String']['output']>>;
  question_number: Scalars['Float']['output'];
  solution_steps: Array<Scalars['String']['output']>;
  tags: Array<QuestionTagType>;
  type: QuestionType;
  version?: Maybe<Version>;
};

export type QuestionConnection = {
  __typename?: 'QuestionConnection';
  count: Scalars['Int']['output'];
  edges: Array<QuestionTypeClassEdge>;
  pageInfo: PageInfo;
};

/** Question difficulty types */
export enum QuestionDifficultyType {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM'
}

export type QuestionInput = {
  correct_answer: Scalars['String']['input'];
  description: Scalars['String']['input'];
  difficulty: QuestionDifficultyType;
  estimated_time_in_ms: Scalars['Float']['input'];
  hints: Array<Scalars['String']['input']>;
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  question_number: Scalars['Float']['input'];
  solution_steps: Array<Scalars['String']['input']>;
  tags: Array<QuestionTagType>;
  type: QuestionType;
};

/** Question tag types */
export enum QuestionTagType {
  TagAlgorithm = 'TAG_ALGORITHM',
  TagDatabase = 'TAG_DATABASE',
  TagDataStructure = 'TAG_DATA_STRUCTURE',
  TagGeneral = 'TAG_GENERAL',
  TagNetwork = 'TAG_NETWORK',
  TagSecurity = 'TAG_SECURITY',
  TagSystem = 'TAG_SYSTEM',
  TagWeb = 'TAG_WEB'
}

/** Question types */
export enum QuestionType {
  FillIn = 'FILL_IN',
  MultipleChoice = 'MULTIPLE_CHOICE',
  MultipleSelect = 'MULTIPLE_SELECT'
}

export type QuestionTypeClassEdge = {
  __typename?: 'QuestionTypeClassEdge';
  cursor: Scalars['String']['output'];
  node: Question;
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  message: Scalars['String']['output'];
};

export type RequestedReviewConnection = {
  __typename?: 'RequestedReviewConnection';
  count: Scalars['Int']['output'];
  edges: Array<ReviewRequestTypeClassEdge>;
  pageInfo: PageInfo;
};

export type RequestedReviewFilterInput = {
  adminId?: InputMaybe<Scalars['String']['input']>;
  instructorId?: InputMaybe<Scalars['String']['input']>;
};

export type Review = {
  __typename?: 'Review';
  course_version?: Maybe<Version>;
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  issues?: Maybe<Array<Issue>>;
  message: Scalars['String']['output'];
  status: ReviewStatusType;
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type ReviewInfoInput = {
  message: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type ReviewRequest = {
  __typename?: 'ReviewRequest';
  course_version?: Maybe<Version>;
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  organization?: Maybe<Organization>;
  updated_at: Scalars['DateTime']['output'];
};

export type ReviewRequestTypeClassEdge = {
  __typename?: 'ReviewRequestTypeClassEdge';
  cursor: Scalars['String']['output'];
  node: ReviewRequest;
};

export type ReviewResponse = {
  __typename?: 'ReviewResponse';
  course_version?: Maybe<Version>;
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  issues?: Maybe<Array<Issue>>;
  message: Scalars['String']['output'];
  status: ReviewStatusType;
  title: Scalars['String']['output'];
  total_issues: Scalars['Float']['output'];
  updated_at: Scalars['DateTime']['output'];
};

/** Review status */
export enum ReviewStatusType {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

export type StatsResponse = {
  __typename?: 'StatsResponse';
  total_admins: Scalars['Float']['output'];
  total_assigned_reviews: Scalars['Float']['output'];
  total_completed_reviews: Scalars['Float']['output'];
  total_instructors: Scalars['Float']['output'];
  total_requested_reviews: Scalars['Float']['output'];
};

export type Student = {
  __typename?: 'Student';
  cart?: Maybe<Cart>;
  checkouts?: Maybe<Array<Checkout>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizations?: Maybe<Array<Organization>>;
  subscribed_categories?: Maybe<Array<Category>>;
  subscribed_courses?: Maybe<Array<Course>>;
};

export type StudentLoginResponse = {
  __typename?: 'StudentLoginResponse';
  cart?: Maybe<Cart>;
  checkouts?: Maybe<Array<Checkout>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizations?: Maybe<Array<Organization>>;
  subscribed_categories?: Maybe<Array<Category>>;
  subscribed_courses?: Maybe<Array<Course>>;
  token: Scalars['String']['output'];
};

export type SubmittedAnswer = {
  __typename?: 'SubmittedAnswer';
  answer_provided: Scalars['String']['output'];
  hints_used: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  is_flagged: Scalars['Boolean']['output'];
  question?: Maybe<Question>;
  question_id: Scalars['String']['output'];
  test?: Maybe<Test>;
};

/** Suite difficulty */
export enum SuiteDifficultyType {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Intermediate = 'INTERMEDIATE'
}

export type Test = {
  __typename?: 'Test';
  id: Scalars['ID']['output'];
  status: TestStatusType;
  submitted_answers?: Maybe<Array<SubmittedAnswer>>;
};

/** Test status */
export enum TestStatusType {
  Ended = 'ENDED',
  OnGoing = 'ON_GOING',
  Paused = 'PAUSED'
}

export type TestSuite = {
  __typename?: 'TestSuite';
  description: Scalars['String']['output'];
  difficulty: SuiteDifficultyType;
  id: Scalars['ID']['output'];
  keywords: Array<Scalars['String']['output']>;
  questions: Array<Question>;
  title: Scalars['String']['output'];
};

export type UpdateCourseInfoInput = {
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<CurrencyType>;
  description?: InputMaybe<Scalars['String']['input']>;
  domains?: InputMaybe<Array<DomainType>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Version = {
  __typename?: 'Version';
  assigned_admin?: Maybe<Admin>;
  course?: Maybe<Course>;
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  questions?: Maybe<Array<Question>>;
  review_request?: Maybe<ReviewRequest>;
  reviews?: Maybe<Array<Review>>;
  status: VersionStatusType;
  test_suites?: Maybe<Array<TestSuite>>;
  updated_at: Scalars['DateTime']['output'];
  version_number: Scalars['Float']['output'];
};

export type VersionConnection = {
  __typename?: 'VersionConnection';
  count: Scalars['Int']['output'];
  edges: Array<VersionResponseEdge>;
  pageInfo: PageInfo;
};

export type VersionResponse = {
  __typename?: 'VersionResponse';
  assigned_admin?: Maybe<Admin>;
  course?: Maybe<Course>;
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  questions?: Maybe<Array<Question>>;
  review_request?: Maybe<ReviewRequest>;
  reviews: Array<ReviewResponse>;
  status: VersionStatusType;
  test_suites?: Maybe<Array<TestSuite>>;
  total_questions: Scalars['Float']['output'];
  total_reviews: Scalars['Float']['output'];
  updated_at: Scalars['DateTime']['output'];
  version_number: Scalars['Float']['output'];
};

export type VersionResponseEdge = {
  __typename?: 'VersionResponseEdge';
  cursor: Scalars['String']['output'];
  node: VersionResponse;
};

/** Version status */
export enum VersionStatusType {
  Approved = 'APPROVED',
  Archived = 'ARCHIVED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type CreateCheckoutMutationVariables = Exact<{
  autoApproveSubscription: Scalars['Boolean']['input'];
  checkoutFromCart?: InputMaybe<Scalars['Boolean']['input']>;
  courseId?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateCheckoutMutation = { __typename?: 'Mutation', createCheckout: { __typename?: 'Checkout', id: string } };

export type EndTestMutationVariables = Exact<{
  testId: Scalars['String']['input'];
}>;


export type EndTestMutation = { __typename?: 'Mutation', endTest: { __typename?: 'Test', id: string, status: TestStatusType } };

export type PauseTestMutationVariables = Exact<{
  testId: Scalars['String']['input'];
}>;


export type PauseTestMutation = { __typename?: 'Mutation', pauseTest: { __typename?: 'Test', id: string, status: TestStatusType } };

export type RegisterStudentMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  organizationId: Scalars['String']['input'];
}>;


export type RegisterStudentMutation = { __typename?: 'Mutation', registerStudent: { __typename?: 'RegisterResponse', message: string } };

export type ResumeTestMutationVariables = Exact<{
  testId: Scalars['String']['input'];
}>;


export type ResumeTestMutation = { __typename?: 'Mutation', resumeTest: { __typename?: 'Test', id: string, status: TestStatusType } };

export type StartTestMutationVariables = Exact<{
  suiteId: Scalars['String']['input'];
}>;


export type StartTestMutation = { __typename?: 'Mutation', startTest: { __typename?: 'Test', id: string, status: TestStatusType } };

export type SubmitAnswerMutationVariables = Exact<{
  testId: Scalars['String']['input'];
  questionId: Scalars['String']['input'];
  timeRange: Scalars['String']['input'];
  answer: Scalars['String']['input'];
}>;


export type SubmitAnswerMutation = { __typename?: 'Mutation', submitAnswer: { __typename?: 'SubmittedAnswer', answer_provided: string, hints_used: Array<string>, id: string, is_flagged: boolean, question_id: string } };

export type GetOrganizationCourseQueryVariables = Exact<{
  courseId: Scalars['String']['input'];
}>;


export type GetOrganizationCourseQuery = { __typename?: 'Query', getOrganizationCourse: { __typename?: 'Course', id: string, avatar_url: string, currency: CurrencyType, description: string, domains: Array<DomainType>, level: LevelType, price: number, title: string, instructor?: { __typename?: 'Instructor', id: string, email: string, name: string } | null } };

export type GetQuestionQueryVariables = Exact<{
  testId: Scalars['String']['input'];
}>;


export type GetQuestionQuery = { __typename?: 'Query', getQuestion: { __typename?: 'Question', description: string, difficulty: QuestionDifficultyType, estimated_time_in_ms: number, hints: Array<string>, id: string, options?: Array<string> | null, question_number: number, solution_steps: Array<string>, tags: Array<QuestionTagType>, type: QuestionType } };

export type GetSubscribedCourseDetailsQueryVariables = Exact<{
  courseId: Scalars['String']['input'];
}>;


export type GetSubscribedCourseDetailsQuery = { __typename?: 'Query', getSubscribedCourseDetails: { __typename?: 'Course', id: string, avatar_url: string, currency: CurrencyType, description: string, domains: Array<DomainType>, level: LevelType, price: number, title: string, instructor?: { __typename?: 'Instructor', id: string, email: string, name: string } | null, approved_version?: { __typename?: 'Version', id: string, questions?: Array<{ __typename?: 'Question', id: string }> | null, test_suites?: Array<{ __typename?: 'TestSuite', id: string, description: string, keywords: Array<string>, title: string, difficulty: SuiteDifficultyType, questions: Array<{ __typename?: 'Question', id: string }> }> | null } | null } };

export type ListOrganizationCoursesQueryVariables = Exact<{
  organizationId: Scalars['String']['input'];
}>;


export type ListOrganizationCoursesQuery = { __typename?: 'Query', listOrganizationCourses: { __typename?: 'CourseConnection', edges: Array<{ __typename?: 'CourseResponseEdge', node: { __typename?: 'CourseResponse', id: string, title: string, avatar_url: string, currency: CurrencyType, description: string, domains: Array<DomainType>, level: LevelType, price: number, is_subscribed: boolean, total_questions: number, estimated_duration: number, instructor?: { __typename?: 'Instructor', id: string, name: string, email: string } | null } }> } };

export type ListOrganizationsQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type ListOrganizationsQuery = { __typename?: 'Query', listOrganizations: { __typename?: 'OrganizationConnection', edges: Array<{ __typename?: 'OrganizationTypeClassEdge', node: { __typename?: 'Organization', name: string, id: string } }> } };

export type LoginStudentQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginStudentQuery = { __typename?: 'Query', loginStudent: { __typename?: 'StudentLoginResponse', id: string, email: string, name: string, token: string, organizations?: Array<{ __typename?: 'Organization', id: string }> | null } };


export const CreateCheckoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCheckout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"autoApproveSubscription"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checkoutFromCart"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCheckout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"autoApproveSubscription"},"value":{"kind":"Variable","name":{"kind":"Name","value":"autoApproveSubscription"}}},{"kind":"Argument","name":{"kind":"Name","value":"checkoutFromCart"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checkoutFromCart"}}},{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCheckoutMutation, CreateCheckoutMutationVariables>;
export const EndTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EndTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<EndTestMutation, EndTestMutationVariables>;
export const PauseTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PauseTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pauseTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<PauseTestMutation, PauseTestMutationVariables>;
export const RegisterStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RegisterStudentMutation, RegisterStudentMutationVariables>;
export const ResumeTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResumeTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resumeTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ResumeTestMutation, ResumeTestMutationVariables>;
export const StartTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"suiteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"suiteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"suiteId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<StartTestMutation, StartTestMutationVariables>;
export const SubmitAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timeRange"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"answer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}},{"kind":"Argument","name":{"kind":"Name","value":"questionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"timeRange"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timeRange"}}},{"kind":"Argument","name":{"kind":"Name","value":"answer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"answer"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answer_provided"}},{"kind":"Field","name":{"kind":"Name","value":"hints_used"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"is_flagged"}},{"kind":"Field","name":{"kind":"Name","value":"question_id"}}]}}]}}]} as unknown as DocumentNode<SubmitAnswerMutation, SubmitAnswerMutationVariables>;
export const GetOrganizationCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrganizationCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOrganizationCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"domains"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<GetOrganizationCourseQuery, GetOrganizationCourseQueryVariables>;
export const GetQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"estimated_time_in_ms"}},{"kind":"Field","name":{"kind":"Name","value":"hints"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"question_number"}},{"kind":"Field","name":{"kind":"Name","value":"solution_steps"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetQuestionQuery, GetQuestionQueryVariables>;
export const GetSubscribedCourseDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubscribedCourseDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSubscribedCourseDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"domains"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"approved_version"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"test_suites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSubscribedCourseDetailsQuery, GetSubscribedCourseDetailsQueryVariables>;
export const ListOrganizationCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListOrganizationCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listOrganizationCourses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"domains"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"is_subscribed"}},{"kind":"Field","name":{"kind":"Name","value":"total_questions"}},{"kind":"Field","name":{"kind":"Name","value":"estimated_duration"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListOrganizationCoursesQuery, ListOrganizationCoursesQueryVariables>;
export const ListOrganizationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListOrganizations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listOrganizations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListOrganizationsQuery, ListOrganizationsQueryVariables>;
export const LoginStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoginStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<LoginStudentQuery, LoginStudentQueryVariables>;