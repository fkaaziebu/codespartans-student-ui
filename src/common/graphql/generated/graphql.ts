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

export type AccountDeletionResponse = {
  __typename?: 'AccountDeletionResponse';
  deletionScheduledFor?: Maybe<Scalars['DateTime']['output']>;
  message: Scalars['String']['output'];
  status: AccountStatus;
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  PendingDeletion = 'PENDING_DELETION'
}

export type ActivateDemoResponse = {
  __typename?: 'ActivateDemoResponse';
  access_token: Scalars['String']['output'];
  email: Scalars['String']['output'];
  expires_at: Scalars['String']['output'];
  org_name: Scalars['String']['output'];
};

export type ActivateParentDemoInput = {
  demo_code: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ActivateSchoolDemoInput = {
  demo_code: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ActivateStudentDemoInput = {
  demo_code: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ActivityConnection = {
  __typename?: 'ActivityConnection';
  count: Scalars['Int']['output'];
  edges: Array<ActivityResponseEdge>;
  pageInfo: PageInfo;
};

export type ActivityResponse = {
  __typename?: 'ActivityResponse';
  activity_date: Scalars['DateTime']['output'];
  course_title?: Maybe<Scalars['String']['output']>;
  questions_done: Scalars['Int']['output'];
  score: Scalars['Float']['output'];
};

export type ActivityResponseEdge = {
  __typename?: 'ActivityResponseEdge';
  cursor: Scalars['String']['output'];
  node: ActivityResponse;
};

export type AddChildInput = {
  class_level: ClassLevel;
  full_name: Scalars['String']['input'];
  school_name?: InputMaybe<Scalars['String']['input']>;
  target_exam: Scalars['String']['input'];
};

export type AddChildResponse = {
  __typename?: 'AddChildResponse';
  message: Scalars['String']['output'];
  pin: Scalars['String']['output'];
};

export type AddSchoolStudentInput = {
  class_level: ClassLevel;
  full_name: Scalars['String']['input'];
  target_exam: Scalars['String']['input'];
};

export type AddStudentResponse = {
  __typename?: 'AddStudentResponse';
  message: Scalars['String']['output'];
  pin: Scalars['String']['output'];
};

export type Admin = {
  __typename?: 'Admin';
  assigned_course_versions_for_review?: Maybe<Array<Version>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  status: AdminStatusType;
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
  status: AdminStatusType;
  token: Scalars['String']['output'];
};

export type AdminResponse = {
  __typename?: 'AdminResponse';
  assigned_course_versions_for_review?: Maybe<Array<Version>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  status: AdminStatusType;
  total_approved_course_versions: Scalars['Float']['output'];
  total_course_versions: Scalars['Float']['output'];
};

export type AdminResponseEdge = {
  __typename?: 'AdminResponseEdge';
  cursor: Scalars['String']['output'];
  node: AdminResponse;
};

/** Admin status */
export enum AdminStatusType {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type AlertAction = {
  __typename?: 'AlertAction';
  href: Scalars['String']['output'];
  label: Scalars['String']['output'];
  variant: Scalars['String']['output'];
};

export type AlertResponse = {
  __typename?: 'AlertResponse';
  actions: Array<AlertAction>;
  alert_type: Scalars['String']['output'];
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  icon_bg: Scalars['String']['output'];
  id: Scalars['String']['output'];
  is_unread: Scalars['Boolean']['output'];
  time_label: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export enum ApproximateStudents {
  Above_500 = 'ABOVE_500',
  Between_50And_100 = 'BETWEEN_50_AND_100',
  Between_100And_300 = 'BETWEEN_100_AND_300',
  Between_300And_500 = 'BETWEEN_300_AND_500',
  Under_50 = 'UNDER_50'
}

export type AttemptConnection = {
  __typename?: 'AttemptConnection';
  count: Scalars['Int']['output'];
  edges: Array<AttemptResponseEdge>;
  pageInfo: PageInfo;
};

export type AttemptFilterInput = {
  from?: InputMaybe<Scalars['DateTime']['input']>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AttemptResponse = {
  __typename?: 'AttemptResponse';
  assignment?: Maybe<TestAssignment>;
  correct: Scalars['Int']['output'];
  course_category?: Maybe<Scalars['String']['output']>;
  course_id: Scalars['String']['output'];
  course_title: Scalars['String']['output'];
  date_taken: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  mode: TestModeType;
  recommendations?: Maybe<Array<Recommendation>>;
  score: Scalars['Float']['output'];
  status: TestStatusType;
  submitted_answers?: Maybe<Array<SubmittedAnswer>>;
  test_suite?: Maybe<TestSuite>;
  time_events?: Maybe<Array<TimeEvent>>;
  time_taken: Scalars['Float']['output'];
  trend?: Maybe<Scalars['Float']['output']>;
  wrong: Scalars['Int']['output'];
};

export type AttemptResponseEdge = {
  __typename?: 'AttemptResponseEdge';
  cursor: Scalars['String']['output'];
  node: AttemptResponse;
};

export type BookDemoResponse = {
  __typename?: 'BookDemoResponse';
  message: Scalars['String']['output'];
};

export type BookParentFreeDemoInput = {
  email: Scalars['String']['input'];
  full_name: Scalars['String']['input'];
  target_exams: Array<Scalars['String']['input']>;
};

export type BookSchoolFreeDemoInput = {
  approximate_students: ApproximateStudents;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  role: SchoolDemoRole;
  school_name: Scalars['String']['input'];
  whatsapp_number: Scalars['String']['input'];
};

export type BookStudentFreeDemoInput = {
  email: Scalars['String']['input'];
  full_name: Scalars['String']['input'];
  target_exam: Scalars['String']['input'];
};

export type BulkEnrollStudentsInput = {
  students: Array<AddSchoolStudentInput>;
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
  date_of_exams?: Maybe<Scalars['DateTime']['output']>;
  exam_duration_days?: Maybe<Scalars['Int']['output']>;
  grading_system: CategoryGradingSystemType;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organization?: Maybe<Organization>;
  subscribed_students?: Maybe<Array<Student>>;
};

export type CategoryCountdownResponse = {
  __typename?: 'CategoryCountdownResponse';
  categoryName: Scalars['String']['output'];
  countdown?: Maybe<Scalars['Int']['output']>;
  exam_duration_days?: Maybe<Scalars['Int']['output']>;
};

/** Grading system used to compute a predicted aggregate */
export enum CategoryGradingSystemType {
  Bece = 'BECE',
  None = 'NONE',
  Wassce = 'WASSCE'
}

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

export type Child = {
  __typename?: 'Child';
  class_level: ClassLevel;
  full_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  parent?: Maybe<Parent>;
  school_name?: Maybe<Scalars['String']['output']>;
  student?: Maybe<Student>;
  target_exam: Scalars['String']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type ChildConnection = {
  __typename?: 'ChildConnection';
  count: Scalars['Int']['output'];
  edges: Array<ChildEdge>;
  pageInfo: PageInfo;
};

export type ChildEdge = {
  __typename?: 'ChildEdge';
  cursor: Scalars['String']['output'];
  node: Child;
};

export type ChildStatsResponse = {
  __typename?: 'ChildStatsResponse';
  avg_score: Scalars['Float']['output'];
  avg_score_percent_diff: Scalars['Float']['output'];
  best_streak_count: Scalars['Int']['output'];
  current_streak_count: Scalars['Int']['output'];
  sessions_this_week: Scalars['Int']['output'];
  total_questions_done: Scalars['Int']['output'];
  total_questions_percent_diff: Scalars['Float']['output'];
};

/** Student class level */
export enum ClassLevel {
  Jhs1 = 'JHS1',
  Jhs2 = 'JHS2',
  Jhs3 = 'JHS3',
  Shs1 = 'SHS1',
  Shs2 = 'SHS2',
  Shs3 = 'SHS3'
}

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
  inserted_at: Scalars['DateTime']['output'];
  instructor?: Maybe<Instructor>;
  is_mandatory: Scalars['Boolean']['output'];
  level: LevelType;
  organization?: Maybe<Organization>;
  price: Scalars['Float']['output'];
  subscribed_students?: Maybe<Array<Student>>;
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  versions?: Maybe<Array<Version>>;
};

export type CourseAggregateEntry = {
  __typename?: 'CourseAggregateEntry';
  course_id: Scalars['ID']['output'];
  course_title: Scalars['String']['output'];
  date_taken?: Maybe<Scalars['DateTime']['output']>;
  grade?: Maybe<Scalars['String']['output']>;
  is_mandatory: Scalars['Boolean']['output'];
  score?: Maybe<Scalars['Float']['output']>;
};

export type CourseConnection = {
  __typename?: 'CourseConnection';
  count: Scalars['Int']['output'];
  edges: Array<CourseResponseEdge>;
  pageInfo: PageInfo;
};

export type CourseFilterInput = {
  is_subscribed?: InputMaybe<Scalars['Boolean']['input']>;
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
  inserted_at: Scalars['DateTime']['output'];
  instructor?: Maybe<Instructor>;
  is_mandatory: Scalars['Boolean']['output'];
  is_subscribed: Scalars['Boolean']['output'];
  level: LevelType;
  organization?: Maybe<Organization>;
  price: Scalars['Float']['output'];
  subscribed_students?: Maybe<Array<Student>>;
  title: Scalars['String']['output'];
  total_questions: Scalars['Float']['output'];
  updated_at: Scalars['DateTime']['output'];
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

export type DayStreakResponse = {
  __typename?: 'DayStreakResponse';
  count: Scalars['Int']['output'];
  date: Scalars['String']['output'];
  is_active: Scalars['Boolean']['output'];
};

export enum DemoStatus {
  Active = 'ACTIVE',
  Converted = 'CONVERTED',
  Expired = 'EXPIRED',
  Pending = 'PENDING'
}

/** Course domains */
export enum DomainType {
  English = 'ENGLISH',
  Mathematics = 'MATHEMATICS',
  Science = 'SCIENCE'
}

export type EnrollStudentResult = {
  __typename?: 'EnrollStudentResult';
  full_name: Scalars['String']['output'];
  pin: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

/** Parent gender */
export enum Gender {
  Female = 'Female',
  Male = 'Male'
}

export type InitiatePaymentResponse = {
  __typename?: 'InitiatePaymentResponse';
  authorization_url: Scalars['String']['output'];
  reference: Scalars['String']['output'];
};

export type Instructor = {
  __typename?: 'Instructor';
  created_courses?: Maybe<Array<Course>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizations?: Maybe<Array<Organization>>;
  status: InstructorStatusType;
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
  status: InstructorStatusType;
  token: Scalars['String']['output'];
};

export type InstructorResponse = {
  __typename?: 'InstructorResponse';
  created_courses?: Maybe<Array<Course>>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  organizations?: Maybe<Array<Organization>>;
  status: InstructorStatusType;
  total_approved_courses: Scalars['Float']['output'];
  total_created_courses: Scalars['Float']['output'];
  total_requested_reviews: Scalars['Float']['output'];
};

export type InstructorResponseEdge = {
  __typename?: 'InstructorResponseEdge';
  cursor: Scalars['String']['output'];
  node: InstructorResponse;
};

/** Instructor status */
export enum InstructorStatusType {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

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

export type LoginChildInput = {
  pin: Scalars['String']['input'];
  temp_token: Scalars['String']['input'];
};

export type LoginChildResponse = {
  __typename?: 'LoginChildResponse';
  class_level: ClassLevel;
  full_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  parent?: Maybe<Parent>;
  refresh_token: Scalars['String']['output'];
  school_name?: Maybe<Scalars['String']['output']>;
  student?: Maybe<Student>;
  target_exam: Scalars['String']['output'];
  token: Scalars['String']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type LoginParentInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginParentResponse = {
  __typename?: 'LoginParentResponse';
  account_status?: Maybe<AccountStatus>;
  children?: Maybe<Array<Child>>;
  deletion_scheduled_for?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  gender: Gender;
  id: Scalars['ID']['output'];
  is_setup_completed: Scalars['Boolean']['output'];
  last_name: Scalars['String']['output'];
  refresh_token?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  whatsapp_number?: Maybe<Scalars['String']['output']>;
};

export type LoginSchoolStudentInput = {
  pin: Scalars['String']['input'];
  temp_token: Scalars['String']['input'];
};

export type LoginSchoolStudentResponse = {
  __typename?: 'LoginSchoolStudentResponse';
  class_level: ClassLevel;
  full_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  organization?: Maybe<Organization>;
  refresh_token: Scalars['String']['output'];
  student?: Maybe<Student>;
  target_exam: Scalars['String']['output'];
  token: Scalars['String']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type MonthlyReportResponse = {
  __typename?: 'MonthlyReportResponse';
  avg_score: Scalars['Float']['output'];
  month: Scalars['Int']['output'];
  streak_days: Scalars['Int']['output'];
  total_questions: Scalars['Int']['output'];
  year: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  activateParentDemo: LoginParentResponse;
  activateSchoolDemo: ActivateDemoResponse;
  activateStudentDemo: StudentLoginResponse;
  addCategoryToCart: Cart;
  addChild: AddChildResponse;
  addCourseToCart: Cart;
  addCourseVersion: Version;
  addCourseVersionReview: Review;
  addCoursesToCategory: Category;
  addQuestionsToCourseVersion: Version;
  addReviewIssue: Issue;
  addSchoolStudent: AddStudentResponse;
  approveCourseVersion: Version;
  assignCourseVersionForReview: Version;
  assignTestToChild: TestAssignment;
  bookParentFreeDemo: BookDemoResponse;
  bookSchoolFreeDemo: BookDemoResponse;
  bookStudentFreeDemo: BookDemoResponse;
  bulkEnrollStudents: Array<EnrollStudentResult>;
  cancelChildDeletion: AccountDeletionResponse;
  cancelParentAccountDeletion: LoginParentResponse;
  cancelStudentAccountDeletion: StudentLoginResponse;
  changeParentPassword: RegisterParentResponse;
  changePassword: PasswordResetResponse;
  changePin: PasswordResetResponse;
  changeStudentPassword: Student;
  closeIssue: Issue;
  closeReview: Review;
  completeSetup: Student;
  completeStudentAccountValidation: PasswordResetResponse;
  createCategory: Category;
  createCheckout: Checkout;
  createCourse: Course;
  deleteChild: AccountDeletionResponse;
  endTest: Test;
  initiatePayment: InitiatePaymentResponse;
  loginChild: LoginChildResponse;
  loginParent: LoginParentResponse;
  loginSchoolStudent: LoginSchoolStudentResponse;
  pauseTest: Test;
  refreshParentToken: RefreshTokenResponse;
  refreshStudentToken: RefreshTokenResponse;
  registerAdmin: Admin;
  registerInstructor: Instructor;
  registerOrganization: RegisterResponse;
  registerParent: RegisterParentResponse;
  registerStudent: RegisterResponse;
  removeCourseFromCart: Cart;
  removeSchoolStudent: AddStudentResponse;
  requestCourseVersionReview: ReviewRequest;
  requestParentAccountDeletion: AccountDeletionResponse;
  requestParentPasswordReset: RegisterParentResponse;
  requestStudentAccountDeletion: AccountDeletionResponse;
  requestStudentPasswordReset: PasswordResetResponse;
  resendAccountValidationCode: PasswordResetResponse;
  resendParentAccountValidationCode: RegisterParentResponse;
  resetChildPin: AddChildResponse;
  resetParentPassword: RegisterParentResponse;
  resetStudentPassword: PasswordResetResponse;
  resetStudentPin: AddStudentResponse;
  resumeTest: Test;
  setupParentAccount: Array<SetupChildResult>;
  shareStudentLogin: AddStudentResponse;
  startAssignedTest: Test;
  startTest: Test;
  submitAnswer: SubmittedAnswer;
  updateCategoryCountdown: Scalars['Boolean']['output'];
  updateCourse: Course;
  updateIssue: Issue;
  updateQuestion: Question;
  verifyCancellationOtp: RegisterParentResponse;
  verifyChildUsername: VerifyChildUsernameResponse;
  verifyParentAccount: RegisterParentResponse;
  verifySchoolStudentUsername: VerifyStudentUsernameResponse;
};


export type MutationActivateParentDemoArgs = {
  input: ActivateParentDemoInput;
};


export type MutationActivateSchoolDemoArgs = {
  input: ActivateSchoolDemoInput;
};


export type MutationActivateStudentDemoArgs = {
  input: ActivateStudentDemoInput;
};


export type MutationAddCategoryToCartArgs = {
  categoryId: Scalars['String']['input'];
};


export type MutationAddChildArgs = {
  input: AddChildInput;
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


export type MutationAddSchoolStudentArgs = {
  input: AddSchoolStudentInput;
};


export type MutationApproveCourseVersionArgs = {
  versionId: Scalars['String']['input'];
};


export type MutationAssignCourseVersionForReviewArgs = {
  adminId: Scalars['String']['input'];
  versionId: Scalars['String']['input'];
};


export type MutationAssignTestToChildArgs = {
  childId: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  suiteId: Scalars['String']['input'];
};


export type MutationBookParentFreeDemoArgs = {
  input: BookParentFreeDemoInput;
};


export type MutationBookSchoolFreeDemoArgs = {
  input: BookSchoolFreeDemoInput;
};


export type MutationBookStudentFreeDemoArgs = {
  input: BookStudentFreeDemoInput;
};


export type MutationBulkEnrollStudentsArgs = {
  input: BulkEnrollStudentsInput;
};


export type MutationCancelChildDeletionArgs = {
  childId: Scalars['String']['input'];
};


export type MutationChangeParentPasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationChangePasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationChangePinArgs = {
  currentPin: Scalars['String']['input'];
  newPin: Scalars['String']['input'];
};


export type MutationChangeStudentPasswordArgs = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};


export type MutationCloseIssueArgs = {
  issueId: Scalars['String']['input'];
};


export type MutationCloseReviewArgs = {
  reviewId: Scalars['String']['input'];
};


export type MutationCompleteSetupArgs = {
  categoryId: Scalars['String']['input'];
  courseIds: Array<Scalars['String']['input']>;
};


export type MutationCompleteStudentAccountValidationArgs = {
  email: Scalars['String']['input'];
  validation_code: Scalars['String']['input'];
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


export type MutationDeleteChildArgs = {
  childId: Scalars['String']['input'];
};


export type MutationEndTestArgs = {
  testId: Scalars['String']['input'];
};


export type MutationInitiatePaymentArgs = {
  children: Array<Scalars['String']['input']>;
  planId: Scalars['String']['input'];
};


export type MutationLoginChildArgs = {
  input: LoginChildInput;
};


export type MutationLoginParentArgs = {
  input: LoginParentInput;
};


export type MutationLoginSchoolStudentArgs = {
  input: LoginSchoolStudentInput;
};


export type MutationPauseTestArgs = {
  testId: Scalars['String']['input'];
};


export type MutationRefreshParentTokenArgs = {
  refresh_token: Scalars['String']['input'];
};


export type MutationRefreshStudentTokenArgs = {
  refresh_token: Scalars['String']['input'];
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


export type MutationRegisterParentArgs = {
  input: RegisterParentInput;
};


export type MutationRegisterStudentArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRemoveCourseFromCartArgs = {
  courseId: Scalars['String']['input'];
};


export type MutationRemoveSchoolStudentArgs = {
  studentId: Scalars['String']['input'];
};


export type MutationRequestCourseVersionReviewArgs = {
  versionId: Scalars['String']['input'];
};


export type MutationRequestParentPasswordResetArgs = {
  email: Scalars['String']['input'];
};


export type MutationRequestStudentPasswordResetArgs = {
  email: Scalars['String']['input'];
};


export type MutationResendAccountValidationCodeArgs = {
  email: Scalars['String']['input'];
};


export type MutationResendParentAccountValidationCodeArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetChildPinArgs = {
  childId: Scalars['String']['input'];
};


export type MutationResetParentPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationResetStudentPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationResetStudentPinArgs = {
  studentId: Scalars['String']['input'];
};


export type MutationResumeTestArgs = {
  testId: Scalars['String']['input'];
};


export type MutationSetupParentAccountArgs = {
  input: SetupParentAccountInput;
};


export type MutationShareStudentLoginArgs = {
  studentId: Scalars['String']['input'];
};


export type MutationStartAssignedTestArgs = {
  assignmentId: Scalars['String']['input'];
  mode?: InputMaybe<TestModeType>;
};


export type MutationStartTestArgs = {
  mode?: InputMaybe<TestModeType>;
  suiteId: Scalars['String']['input'];
};


export type MutationSubmitAnswerArgs = {
  answer: Scalars['String']['input'];
  isFlagged: Scalars['Boolean']['input'];
  questionId: Scalars['String']['input'];
  testId: Scalars['String']['input'];
  timeRange: Scalars['String']['input'];
};


export type MutationUpdateCategoryCountdownArgs = {
  categoryId: Scalars['String']['input'];
  dateOfExams: Scalars['DateTime']['input'];
  examDurationDays: Scalars['Int']['input'];
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


export type MutationVerifyCancellationOtpArgs = {
  otp: Scalars['String']['input'];
};


export type MutationVerifyChildUsernameArgs = {
  input: VerifyChildUsernameInput;
};


export type MutationVerifyParentAccountArgs = {
  input: VerifyParentInput;
};


export type MutationVerifySchoolStudentUsernameArgs = {
  username: Scalars['String']['input'];
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
  school_demo?: Maybe<SchoolDemo>;
  students?: Maybe<Array<Student>>;
};

export type OrganizationConnection = {
  __typename?: 'OrganizationConnection';
  count: Scalars['Int']['output'];
  edges: Array<OrganizationEdge>;
  pageInfo: PageInfo;
};

export type OrganizationEdge = {
  __typename?: 'OrganizationEdge';
  cursor: Scalars['String']['output'];
  node: Organization;
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
  school_demo?: Maybe<SchoolDemo>;
  students?: Maybe<Array<Student>>;
  token: Scalars['String']['output'];
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

export type Parent = {
  __typename?: 'Parent';
  children?: Maybe<Array<Child>>;
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  gender: Gender;
  id: Scalars['ID']['output'];
  is_setup_completed: Scalars['Boolean']['output'];
  last_name: Scalars['String']['output'];
  whatsapp_number?: Maybe<Scalars['String']['output']>;
};

export type ParentSubscription = {
  __typename?: 'ParentSubscription';
  children?: Maybe<Array<Child>>;
  created_at: Scalars['DateTime']['output'];
  expires_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  parent?: Maybe<Parent>;
  paystack_reference?: Maybe<Scalars['String']['output']>;
  plan: SubscriptionPlan;
  started_at: Scalars['DateTime']['output'];
  status: SubscriptionStatus;
  updated_at: Scalars['DateTime']['output'];
};

export type PasswordResetResponse = {
  __typename?: 'PasswordResetResponse';
  message: Scalars['String']['output'];
};

export enum PlanInterval {
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY',
  Yearly = 'YEARLY'
}

export type Query = {
  __typename?: 'Query';
  getActiveTest: Test;
  getAllAttemptedQuestions: Array<SubmittedAnswer>;
  getCategoryCountdown: CategoryCountdownResponse;
  getChildActivity: ActivityConnection;
  getChildStats: ChildStatsResponse;
  getChildStreak: StreakResponse;
  getChildSubjectProgress: Array<SubjectProgressResponse>;
  getChildTestsHistory: AttemptConnection;
  getChildWeakAreas: Array<WeakSubjectAreaResponse>;
  getCourse: Course;
  getCourseVersion: VersionResponse;
  getCurrentStreakCount: StreakResponse;
  getInstructorCourseVersion: VersionResponse;
  getInstructorVersionReview: Review;
  getMyStudentSubscription?: Maybe<StudentSubscription>;
  getMySubscription?: Maybe<ParentSubscription>;
  getOrganizationCourse: StudentCourseResponse;
  getQuestion: Question;
  getStats: StatsResponse;
  getStudentAggregate: StudentAggregateResponse;
  getStudentStats: StudentStatsResponse;
  getSubscribedCourseDetails: Course;
  getTest: Test;
  getTestScoreHistory: Array<TestScoreHistoryResponse>;
  getVersionReview: Review;
  getWeeklyInsight?: Maybe<WeeklyInsight>;
  listAdmins: AdminConnection;
  listAssignedVersions: VersionConnection;
  listAttempts: AttemptConnection;
  listCartCategories: Array<Category>;
  listCartCourses: Array<Course>;
  listChildAssignments: Array<TestAssignment>;
  listChildCourses: Array<Course>;
  listChildMonthlyReports: Array<MonthlyReportResponse>;
  listChildStreak: Array<DayStreakResponse>;
  listChildren: ChildConnection;
  listCourseSuites: TestSuiteConnection;
  listCourses: CourseConnection;
  listCoursesForOrganization: CourseConnection;
  listInstructorQuestionsForVersion: QuestionConnection;
  listInstructors: InstructorConnection;
  listMyAssignments: Array<TestAssignment>;
  listMyStudentSubscriptions: Array<StudentSubscription>;
  listMySubscriptions: Array<ParentSubscription>;
  listOrganizationCategories: Array<Category>;
  listOrganizationCourses: CourseConnection;
  listOrganizations: OrganizationConnection;
  listParentAlerts: Array<AlertResponse>;
  listParentOrganizationCategories: Array<Category>;
  listQuestionsForVersion: QuestionConnection;
  listRequestedReviews: RequestedReviewConnection;
  listSchoolStudents: SchoolStudentConnection;
  listSubscriptionPlans: Array<SubscriptionPlan>;
  loginAdmin: AdminLoginResponse;
  loginInstructor: InstructorLoginResponse;
  loginOrganization: OrganizationLoginResponse;
  loginStudent: StudentLoginResponse;
  shareChildLogin: RegisterParentResponse;
  studentProfile: Student;
  studentSubjectProgress: Array<SubjectProgressResponse>;
  studentTestTopicProgress: Array<TestTopicProgressResponse>;
  testStats: Test;
  weakSubjectAreas: Array<WeakSubjectAreaResponse>;
};


export type QueryGetAllAttemptedQuestionsArgs = {
  testId: Scalars['String']['input'];
};


export type QueryGetCategoryCountdownArgs = {
  categoryId: Scalars['String']['input'];
};


export type QueryGetChildActivityArgs = {
  childId: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryGetChildStatsArgs = {
  childId: Scalars['String']['input'];
};


export type QueryGetChildStreakArgs = {
  childId: Scalars['String']['input'];
};


export type QueryGetChildSubjectProgressArgs = {
  childId: Scalars['String']['input'];
  courseId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetChildTestsHistoryArgs = {
  childId: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryGetChildWeakAreasArgs = {
  childId: Scalars['String']['input'];
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


export type QueryGetStudentAggregateArgs = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetSubscribedCourseDetailsArgs = {
  courseId: Scalars['String']['input'];
  filter?: InputMaybe<SuiteFilterInput>;
};


export type QueryGetTestArgs = {
  testId: Scalars['String']['input'];
};


export type QueryGetTestScoreHistoryArgs = {
  testId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetVersionReviewArgs = {
  reviewId: Scalars['String']['input'];
};


export type QueryListAdminsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListAttemptsArgs = {
  filter?: InputMaybe<AttemptFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListChildAssignmentsArgs = {
  childId: Scalars['String']['input'];
};


export type QueryListChildCoursesArgs = {
  childId: Scalars['String']['input'];
};


export type QueryListChildMonthlyReportsArgs = {
  childId: Scalars['String']['input'];
};


export type QueryListChildStreakArgs = {
  childId: Scalars['String']['input'];
  month: Scalars['Int']['input'];
  year: Scalars['Int']['input'];
};


export type QueryListChildrenArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryListCourseSuitesArgs = {
  courseId: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
  suiteTypes?: InputMaybe<Array<SuiteType>>;
};


export type QueryListCoursesArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListCoursesForOrganizationArgs = {
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


export type QueryListOrganizationCategoriesArgs = {
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListOrganizationCoursesArgs = {
  filter?: InputMaybe<CourseFilterInput>;
  organizationId?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListOrganizationsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryListParentOrganizationCategoriesArgs = {
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


export type QueryListSchoolStudentsArgs = {
  pagination?: InputMaybe<PaginationInput>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
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


export type QueryShareChildLoginArgs = {
  childId: Scalars['String']['input'];
};


export type QueryStudentSubjectProgressArgs = {
  testId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryStudentTestTopicProgressArgs = {
  testId: Scalars['String']['input'];
};


export type QueryTestStatsArgs = {
  testId: Scalars['String']['input'];
};


export type QueryWeakSubjectAreasArgs = {
  testId?: InputMaybe<Scalars['String']['input']>;
};

export type Question = {
  __typename?: 'Question';
  class_level?: Maybe<QuestionClassLevel>;
  correct_answer: Scalars['String']['output'];
  description: Scalars['String']['output'];
  difficulty: QuestionDifficultyType;
  estimated_time_in_ms: Scalars['Int']['output'];
  exam_year?: Maybe<Scalars['Int']['output']>;
  hints: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  marks: Scalars['Int']['output'];
  options?: Maybe<Array<Scalars['String']['output']>>;
  question_number: Scalars['Int']['output'];
  solution_steps: Array<Scalars['String']['output']>;
  tags: Array<QuestionTagType>;
  type: QuestionType;
  version?: Maybe<Version>;
};

/** Syllabus class level the question originates from */
export enum QuestionClassLevel {
  Jhs_1 = 'JHS_1',
  Jhs_2 = 'JHS_2',
  Jhs_3 = 'JHS_3',
  Shs_1 = 'SHS_1',
  Shs_2 = 'SHS_2',
  Shs_3 = 'SHS_3'
}

export type QuestionConnection = {
  __typename?: 'QuestionConnection';
  count: Scalars['Int']['output'];
  edges: Array<QuestionEdge>;
  pageInfo: PageInfo;
};

/** Question difficulty types */
export enum QuestionDifficultyType {
  Easy = 'EASY',
  Hard = 'HARD',
  Medium = 'MEDIUM'
}

export type QuestionEdge = {
  __typename?: 'QuestionEdge';
  cursor: Scalars['String']['output'];
  node: Question;
};

export type QuestionInput = {
  class_level?: InputMaybe<QuestionClassLevel>;
  correct_answer: Scalars['String']['input'];
  description: Scalars['String']['input'];
  difficulty: QuestionDifficultyType;
  estimated_time_in_ms: Scalars['Float']['input'];
  exam_year?: InputMaybe<Scalars['Int']['input']>;
  hints: Array<Scalars['String']['input']>;
  marks?: InputMaybe<Scalars['Int']['input']>;
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  question_number: Scalars['Float']['input'];
  solution_steps: Array<Scalars['String']['input']>;
  tags: Array<QuestionTagType>;
  type: QuestionType;
};

/** Question tag types */
export enum QuestionTagType {
  TagAcidsBasesAndSalts = 'TAG_ACIDS_BASES_AND_SALTS',
  TagAfricanTraditionalReligion = 'TAG_AFRICAN_TRADITIONAL_RELIGION',
  TagAirAndWater = 'TAG_AIR_AND_WATER',
  TagAlgebra = 'TAG_ALGEBRA',
  TagAtomicAndNuclearPhysics = 'TAG_ATOMIC_AND_NUCLEAR_PHYSICS',
  TagAtomicStructure = 'TAG_ATOMIC_STRUCTURE',
  TagCalculus = 'TAG_CALCULUS',
  TagCellBiology = 'TAG_CELL_BIOLOGY',
  TagChemicalBonding = 'TAG_CHEMICAL_BONDING',
  TagChristianity = 'TAG_CHRISTIANITY',
  TagClassification = 'TAG_CLASSIFICATION',
  TagColonialPeriod = 'TAG_COLONIAL_PERIOD',
  TagComputerHardware = 'TAG_COMPUTER_HARDWARE',
  TagConstitutionAndLaw = 'TAG_CONSTITUTION_AND_LAW',
  TagCultureAndValues = 'TAG_CULTURE_AND_VALUES',
  TagDataManagement = 'TAG_DATA_MANAGEMENT',
  TagDemandAndSupply = 'TAG_DEMAND_AND_SUPPLY',
  TagDemocraticInstitutions = 'TAG_DEMOCRATIC_INSTITUTIONS',
  TagDiversityOfMatter = 'TAG_DIVERSITY_OF_MATTER',
  TagDrama = 'TAG_DRAMA',
  TagEarthAndSpace = 'TAG_EARTH_AND_SPACE',
  TagEcology = 'TAG_ECOLOGY',
  TagEconomicDevelopment = 'TAG_ECONOMIC_DEVELOPMENT',
  TagEconomicGeography = 'TAG_ECONOMIC_GEOGRAPHY',
  TagElectricityAndMagnetism = 'TAG_ELECTRICITY_AND_MAGNETISM',
  TagElectrochemistry = 'TAG_ELECTROCHEMISTRY',
  TagEnvironmentAndSociety = 'TAG_ENVIRONMENT_AND_SOCIETY',
  TagEssayWriting = 'TAG_ESSAY_WRITING',
  TagFrenchComprehension = 'TAG_FRENCH_COMPREHENSION',
  TagFrenchGrammar = 'TAG_FRENCH_GRAMMAR',
  TagFrenchVocabulary = 'TAG_FRENCH_VOCABULARY',
  TagGeneral = 'TAG_GENERAL',
  TagGeneticsAndEvolution = 'TAG_GENETICS_AND_EVOLUTION',
  TagGeometry = 'TAG_GEOMETRY',
  TagGhanaHistory = 'TAG_GHANA_HISTORY',
  TagGhanaPoliticalHistory = 'TAG_GHANA_POLITICAL_HISTORY',
  TagGovernmentAndCitizenship = 'TAG_GOVERNMENT_AND_CITIZENSHIP',
  TagGrammarAndUsage = 'TAG_GRAMMAR_AND_USAGE',
  TagHeatAndThermodynamics = 'TAG_HEAT_AND_THERMODYNAMICS',
  TagHumanGeography = 'TAG_HUMAN_GEOGRAPHY',
  TagHumanPhysiology = 'TAG_HUMAN_PHYSIOLOGY',
  TagIndependenceMovements = 'TAG_INDEPENDENCE_MOVEMENTS',
  TagInternationalTrade = 'TAG_INTERNATIONAL_TRADE',
  TagInternetAndNetworking = 'TAG_INTERNET_AND_NETWORKING',
  TagIslam = 'TAG_ISLAM',
  TagLifeProcesses = 'TAG_LIFE_PROCESSES',
  TagMapReading = 'TAG_MAP_READING',
  TagMeasurement = 'TAG_MEASUREMENT',
  TagMechanics = 'TAG_MECHANICS',
  TagMensuration = 'TAG_MENSURATION',
  TagMicroorganismsAndDisease = 'TAG_MICROORGANISMS_AND_DISEASE',
  TagMoneyAndBanking = 'TAG_MONEY_AND_BANKING',
  TagNationalIncome = 'TAG_NATIONAL_INCOME',
  TagNumberAndNumeration = 'TAG_NUMBER_AND_NUMERATION',
  TagOralEnglish = 'TAG_ORAL_ENGLISH',
  TagOrganicChemistry = 'TAG_ORGANIC_CHEMISTRY',
  TagPeriodicTable = 'TAG_PERIODIC_TABLE',
  TagPhysicalGeography = 'TAG_PHYSICAL_GEOGRAPHY',
  TagPhysicalProcesses = 'TAG_PHYSICAL_PROCESSES',
  TagPlantBiology = 'TAG_PLANT_BIOLOGY',
  TagPoetry = 'TAG_POETRY',
  TagPopulationAndDevelopment = 'TAG_POPULATION_AND_DEVELOPMENT',
  TagPrecolonialAfrica = 'TAG_PRECOLONIAL_AFRICA',
  TagProductionAndCosts = 'TAG_PRODUCTION_AND_COSTS',
  TagProgrammingBasics = 'TAG_PROGRAMMING_BASICS',
  TagProse = 'TAG_PROSE',
  TagPublicFinance = 'TAG_PUBLIC_FINANCE',
  TagReadingComprehension = 'TAG_READING_COMPREHENSION',
  TagRegionalGeography = 'TAG_REGIONAL_GEOGRAPHY',
  TagSets = 'TAG_SETS',
  TagSoftwareAndApplications = 'TAG_SOFTWARE_AND_APPLICATIONS',
  TagStatisticsAndProbability = 'TAG_STATISTICS_AND_PROBABILITY',
  TagStoichiometry = 'TAG_STOICHIOMETRY',
  TagSummaryWriting = 'TAG_SUMMARY_WRITING',
  TagTrigonometry = 'TAG_TRIGONOMETRY',
  TagVectorsAndMatrices = 'TAG_VECTORS_AND_MATRICES',
  TagVocabulary = 'TAG_VOCABULARY',
  TagWavesAndOptics = 'TAG_WAVES_AND_OPTICS'
}

/** Question types */
export enum QuestionType {
  FillIn = 'FILL_IN',
  MultipleChoice = 'MULTIPLE_CHOICE',
  MultipleSelect = 'MULTIPLE_SELECT',
  ShortAnswer = 'SHORT_ANSWER'
}

export type Recommendation = {
  __typename?: 'Recommendation';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type RefreshTokenResponse = {
  __typename?: 'RefreshTokenResponse';
  access_token: Scalars['String']['output'];
};

export type RegisterParentInput = {
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  gender?: InputMaybe<Gender>;
  last_name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  whatsapp_number: Scalars['String']['input'];
};

export type RegisterParentResponse = {
  __typename?: 'RegisterParentResponse';
  message: Scalars['String']['output'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  message: Scalars['String']['output'];
};

export type RequestedReviewConnection = {
  __typename?: 'RequestedReviewConnection';
  count: Scalars['Int']['output'];
  edges: Array<ReviewRequestEdge>;
  pageInfo: PageInfo;
};

export type RequestedReviewFilterInput = {
  adminId?: InputMaybe<Scalars['String']['input']>;
  instructorId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<VersionStatusType>;
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

export type ReviewRequestEdge = {
  __typename?: 'ReviewRequestEdge';
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

export type SchoolDemo = {
  __typename?: 'SchoolDemo';
  activated_at?: Maybe<Scalars['DateTime']['output']>;
  approximate_students: ApproximateStudents;
  created_at: Scalars['DateTime']['output'];
  demo_code: Scalars['String']['output'];
  email: Scalars['String']['output'];
  expires_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  role: SchoolDemoRole;
  school_name: Scalars['String']['output'];
  status: DemoStatus;
  trial_duration_days: Scalars['Float']['output'];
  updated_at: Scalars['DateTime']['output'];
  whatsapp_number: Scalars['String']['output'];
};

export enum SchoolDemoRole {
  AcademicDirector = 'ACADEMIC_DIRECTOR',
  HeadmasterPrincipal = 'HEADMASTER_PRINCIPAL',
  Other = 'OTHER',
  ProprietorOwner = 'PROPRIETOR_OWNER',
  Teacher = 'TEACHER'
}

export type SchoolStudent = {
  __typename?: 'SchoolStudent';
  class_level: ClassLevel;
  full_name: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  organization?: Maybe<Organization>;
  student?: Maybe<Student>;
  target_exam: Scalars['String']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type SchoolStudentConnection = {
  __typename?: 'SchoolStudentConnection';
  count: Scalars['Int']['output'];
  edges: Array<SchoolStudentEdge>;
  pageInfo: PageInfo;
};

export type SchoolStudentEdge = {
  __typename?: 'SchoolStudentEdge';
  cursor: Scalars['String']['output'];
  node: SchoolStudent;
};

export type SetupChildResult = {
  __typename?: 'SetupChildResult';
  full_name: Scalars['String']['output'];
  pin: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type SetupParentAccountInput = {
  children: Array<AddChildInput>;
};

export type StatsResponse = {
  __typename?: 'StatsResponse';
  total_admins: Scalars['Float']['output'];
  total_assigned_reviews: Scalars['Float']['output'];
  total_completed_reviews: Scalars['Float']['output'];
  total_instructors: Scalars['Float']['output'];
  total_requested_reviews: Scalars['Float']['output'];
};

export type StreakResponse = {
  __typename?: 'StreakResponse';
  best_streak: Scalars['Int']['output'];
  current_streak: Scalars['Int']['output'];
};

export type Student = {
  __typename?: 'Student';
  account_status?: Maybe<AccountStatus>;
  cart?: Maybe<Cart>;
  checkouts?: Maybe<Array<Checkout>>;
  deletion_scheduled_for?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is_setup_completed: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  organizations?: Maybe<Array<Organization>>;
  subscribed_categories?: Maybe<Array<Category>>;
  subscribed_courses?: Maybe<Array<Course>>;
};

export type StudentAggregateResponse = {
  __typename?: 'StudentAggregateResponse';
  aggregate_range?: Maybe<Scalars['String']['output']>;
  category_id: Scalars['ID']['output'];
  category_name: Scalars['String']['output'];
  courses_with_test_taken: Array<CourseAggregateEntry>;
  courses_without_test_taken: Array<CourseAggregateEntry>;
  grading_system: CategoryGradingSystemType;
  message: Scalars['String']['output'];
  required_subjects_count: Scalars['Int']['output'];
  state: StudentAggregateStateType;
  tested_required_subjects_count: Scalars['Int']['output'];
};

/** How much test data is available to predict the aggregate */
export enum StudentAggregateStateType {
  CompleteData = 'COMPLETE_DATA',
  PartialData = 'PARTIAL_DATA',
  ZeroData = 'ZERO_DATA'
}

export type StudentCourseResponse = {
  __typename?: 'StudentCourseResponse';
  approved_version?: Maybe<Version>;
  avatar_url: Scalars['String']['output'];
  categories?: Maybe<Array<Category>>;
  coupons?: Maybe<Array<Coupon>>;
  currency: CurrencyType;
  description: Scalars['String']['output'];
  domains: Array<DomainType>;
  id: Scalars['ID']['output'];
  inserted_at: Scalars['DateTime']['output'];
  instructor?: Maybe<Instructor>;
  is_course_in_cart: Scalars['Boolean']['output'];
  is_mandatory: Scalars['Boolean']['output'];
  is_subscribed: Scalars['Boolean']['output'];
  level: LevelType;
  organization?: Maybe<Organization>;
  price: Scalars['Float']['output'];
  subscribed_students?: Maybe<Array<Student>>;
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  versions?: Maybe<Array<Version>>;
};

export type StudentLoginResponse = {
  __typename?: 'StudentLoginResponse';
  account_status?: Maybe<AccountStatus>;
  cart?: Maybe<Cart>;
  checkouts?: Maybe<Array<Checkout>>;
  deletion_scheduled_for?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  is_setup_completed: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  organizations?: Maybe<Array<Organization>>;
  refresh_token?: Maybe<Scalars['String']['output']>;
  subscribed_categories?: Maybe<Array<Category>>;
  subscribed_courses?: Maybe<Array<Course>>;
  token: Scalars['String']['output'];
};

export type StudentStatsResponse = {
  __typename?: 'StudentStatsResponse';
  average_score: Scalars['Float']['output'];
  average_score_percentage_change: Scalars['Float']['output'];
  study_hours: Scalars['Float']['output'];
  total_test_taken: Scalars['Int']['output'];
  total_test_taken_percentage_change: Scalars['Float']['output'];
  weak_areas_count: Scalars['Int']['output'];
};

export type StudentSubscription = {
  __typename?: 'StudentSubscription';
  created_at: Scalars['DateTime']['output'];
  expires_at: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  paystack_reference?: Maybe<Scalars['String']['output']>;
  plan: SubscriptionPlan;
  started_at: Scalars['DateTime']['output'];
  status: SubscriptionStatus;
  student?: Maybe<Student>;
  updated_at: Scalars['DateTime']['output'];
};

export type SubjectProgressResponse = {
  __typename?: 'SubjectProgressResponse';
  correct: Scalars['Int']['output'];
  score: Scalars['Float']['output'];
  subject: Scalars['String']['output'];
  total: Scalars['Int']['output'];
  wrong: Scalars['Int']['output'];
};

export type SubmittedAnswer = {
  __typename?: 'SubmittedAnswer';
  answer_provided: Scalars['String']['output'];
  hints_used: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  is_correct?: Maybe<Scalars['Boolean']['output']>;
  is_flagged: Scalars['Boolean']['output'];
  is_marked: Scalars['Boolean']['output'];
  question?: Maybe<Question>;
  question_id: Scalars['String']['output'];
  test?: Maybe<Test>;
};

export type SubscriptionPlan = {
  __typename?: 'SubscriptionPlan';
  billing_label?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['DateTime']['output'];
  currency: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration_days: Scalars['Int']['output'];
  features: Array<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  interval: PlanInterval;
  is_active: Scalars['Boolean']['output'];
  is_custom: Scalars['Boolean']['output'];
  max_students?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  plan_key: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  tagline?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export enum SubscriptionStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Expired = 'EXPIRED'
}

/** Suite difficulty */
export enum SuiteDifficultyType {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Intermediate = 'INTERMEDIATE'
}

export type SuiteFilterInput = {
  suite_type?: InputMaybe<SuiteType>;
};

/** Suite type — Year-based exam prep, Class level, or Topic focused */
export enum SuiteType {
  Class = 'CLASS',
  Mixed = 'MIXED',
  PastQuestions = 'PAST_QUESTIONS',
  Topic = 'TOPIC',
  Year = 'YEAR',
  YearOne = 'YEAR_ONE',
  YearThree = 'YEAR_THREE',
  YearTwo = 'YEAR_TWO'
}

export type Test = {
  __typename?: 'Test';
  assignment?: Maybe<TestAssignment>;
  course_category?: Maybe<Scalars['String']['output']>;
  course_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  mode: TestModeType;
  recommendations?: Maybe<Array<Recommendation>>;
  status: TestStatusType;
  submitted_answers?: Maybe<Array<SubmittedAnswer>>;
  test_suite?: Maybe<TestSuite>;
  time_events?: Maybe<Array<TimeEvent>>;
};

export type TestAssignment = {
  __typename?: 'TestAssignment';
  assigned_at: Scalars['DateTime']['output'];
  child?: Maybe<Child>;
  completed_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Parent>;
  status: TestAssignmentStatus;
  test?: Maybe<Test>;
  test_suite?: Maybe<TestSuite>;
};

/** Test assignment status */
export enum TestAssignmentStatus {
  Completed = 'COMPLETED',
  Pending = 'PENDING'
}

/** Test mode */
export enum TestModeType {
  Proctured = 'PROCTURED',
  UnProctured = 'UN_PROCTURED'
}

export type TestScoreHistoryResponse = {
  __typename?: 'TestScoreHistoryResponse';
  course_title: Scalars['String']['output'];
  date_taken: Scalars['DateTime']['output'];
  score: Scalars['Float']['output'];
  test_id: Scalars['String']['output'];
};

/** Test status */
export enum TestStatusType {
  Ended = 'ENDED',
  OnGoing = 'ON_GOING',
  Paused = 'PAUSED'
}

export type TestSuite = {
  __typename?: 'TestSuite';
  description?: Maybe<Scalars['String']['output']>;
  difficulty: SuiteDifficultyType;
  id: Scalars['ID']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  keywords?: Maybe<Array<Scalars['String']['output']>>;
  questions?: Maybe<Array<Question>>;
  suite_type?: Maybe<SuiteType>;
  title?: Maybe<Scalars['String']['output']>;
};

export type TestSuiteConnection = {
  __typename?: 'TestSuiteConnection';
  count: Scalars['Int']['output'];
  edges: Array<TestSuiteEdge>;
  pageInfo: PageInfo;
};

export type TestSuiteEdge = {
  __typename?: 'TestSuiteEdge';
  cursor: Scalars['String']['output'];
  node: TestSuite;
};

export type TestTopicProgressResponse = {
  __typename?: 'TestTopicProgressResponse';
  correct: Scalars['Int']['output'];
  score: Scalars['Float']['output'];
  topic: Scalars['String']['output'];
  total: Scalars['Int']['output'];
  wrong: Scalars['Int']['output'];
};

export type TimeEvent = {
  __typename?: 'TimeEvent';
  id: Scalars['ID']['output'];
  recorded_at: Scalars['DateTime']['output'];
  test?: Maybe<Test>;
  type: TimeEventType;
};

/** Time event type */
export enum TimeEventType {
  Ended = 'ENDED',
  Paused = 'PAUSED',
  Resumed = 'RESUMED',
  Started = 'STARTED'
}

export type UpdateCourseInfoInput = {
  avatar_url?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<CurrencyType>;
  description?: InputMaybe<Scalars['String']['input']>;
  domains?: InputMaybe<Array<DomainType>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type VerifyChildUsernameInput = {
  username: Scalars['String']['input'];
};

export type VerifyChildUsernameResponse = {
  __typename?: 'VerifyChildUsernameResponse';
  temp_token: Scalars['String']['output'];
};

export type VerifyParentInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type VerifyStudentUsernameResponse = {
  __typename?: 'VerifyStudentUsernameResponse';
  temp_token: Scalars['String']['output'];
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
  version_number: Scalars['Int']['output'];
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
  version_number: Scalars['Int']['output'];
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
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type WeakSubjectAreaResponse = {
  __typename?: 'WeakSubjectAreaResponse';
  accuracy: Scalars['Float']['output'];
  error_count: Scalars['Int']['output'];
  questions: Array<Question>;
  subject: Scalars['String']['output'];
  total: Scalars['Int']['output'];
};

export type WeeklyInsight = {
  __typename?: 'WeeklyInsight';
  description: Scalars['String']['output'];
  suites: Array<WeeklyInsightSuite>;
  title: Scalars['String']['output'];
};

export type WeeklyInsightSuite = {
  __typename?: 'WeeklyInsightSuite';
  accuracy: Scalars['Float']['output'];
  suite_id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type ActivateStudentDemoMutationVariables = Exact<{
  input: ActivateStudentDemoInput;
}>;


export type ActivateStudentDemoMutation = { __typename?: 'Mutation', activateStudentDemo: { __typename?: 'StudentLoginResponse', id: string, name: string, email: string, is_setup_completed: boolean, token: string, refresh_token?: string | null } };

export type AddCourseToCartMutationVariables = Exact<{
  courseId: Scalars['String']['input'];
}>;


export type AddCourseToCartMutation = { __typename?: 'Mutation', addCourseToCart: { __typename?: 'Cart', id: string } };

export type CancelStudentAccountDeletionMutationVariables = Exact<{ [key: string]: never; }>;


export type CancelStudentAccountDeletionMutation = { __typename?: 'Mutation', cancelStudentAccountDeletion: { __typename?: 'StudentLoginResponse', token: string, refresh_token?: string | null, account_status?: AccountStatus | null, name: string, email: string, is_setup_completed: boolean, organizations?: Array<{ __typename?: 'Organization', id: string, email: string }> | null } };

export type ChangePinMutationVariables = Exact<{
  currentPin: Scalars['String']['input'];
  newPin: Scalars['String']['input'];
}>;


export type ChangePinMutation = { __typename?: 'Mutation', changePin: { __typename?: 'PasswordResetResponse', message: string } };

export type ChangeStudentPasswordMutationVariables = Exact<{
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
}>;


export type ChangeStudentPasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'PasswordResetResponse', message: string } };

export type CompleteSetupMutationVariables = Exact<{
  categoryId: Scalars['String']['input'];
  courseIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type CompleteSetupMutation = { __typename?: 'Mutation', completeSetup: { __typename?: 'Student', id: string, is_setup_completed: boolean, email: string, name: string } };

export type CompleteStudentAccountValidationMutationVariables = Exact<{
  email: Scalars['String']['input'];
  validationCode: Scalars['String']['input'];
}>;


export type CompleteStudentAccountValidationMutation = { __typename?: 'Mutation', completeStudentAccountValidation: { __typename?: 'PasswordResetResponse', message: string } };

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

export type InitiatePaymentMutationVariables = Exact<{
  planId: Scalars['String']['input'];
  children: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type InitiatePaymentMutation = { __typename?: 'Mutation', initiatePayment: { __typename?: 'InitiatePaymentResponse', authorization_url: string, reference: string } };

export type LoginChildMutationVariables = Exact<{
  input: LoginChildInput;
}>;


export type LoginChildMutation = { __typename?: 'Mutation', loginChild: { __typename?: 'LoginChildResponse', id: string, full_name: string, class_level: ClassLevel, target_exam: string, school_name?: string | null, username?: string | null, token: string, refresh_token: string, student?: { __typename?: 'Student', id: string, name: string, email: string, is_setup_completed: boolean, organizations?: Array<{ __typename?: 'Organization', id: string, email: string }> | null } | null } };

export type PauseTestMutationVariables = Exact<{
  testId: Scalars['String']['input'];
}>;


export type PauseTestMutation = { __typename?: 'Mutation', pauseTest: { __typename?: 'Test', id: string, status: TestStatusType } };

export type RefreshStudentTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshStudentTokenMutation = { __typename?: 'Mutation', refreshStudentToken: { __typename?: 'RefreshTokenResponse', access_token: string } };

export type RegisterStudentMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterStudentMutation = { __typename?: 'Mutation', registerStudent: { __typename?: 'RegisterResponse', message: string } };

export type RemoveCourseFromCartMutationVariables = Exact<{
  courseId: Scalars['String']['input'];
}>;


export type RemoveCourseFromCartMutation = { __typename?: 'Mutation', removeCourseFromCart: { __typename?: 'Cart', id: string } };

export type RequestStudentAccountDeletionMutationVariables = Exact<{ [key: string]: never; }>;


export type RequestStudentAccountDeletionMutation = { __typename?: 'Mutation', requestStudentAccountDeletion: { __typename?: 'AccountDeletionResponse', message: string, deletionScheduledFor?: any | null, status: AccountStatus } };

export type RequestStudentPasswordResetMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type RequestStudentPasswordResetMutation = { __typename?: 'Mutation', requestStudentPasswordReset: { __typename?: 'PasswordResetResponse', message: string } };

export type ResendAccountValidationCodeMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ResendAccountValidationCodeMutation = { __typename?: 'Mutation', resendAccountValidationCode: { __typename?: 'PasswordResetResponse', message: string } };

export type ResetStudentPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  token: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type ResetStudentPasswordMutation = { __typename?: 'Mutation', resetStudentPassword: { __typename?: 'PasswordResetResponse', message: string } };

export type ResumeTestMutationVariables = Exact<{
  testId: Scalars['String']['input'];
}>;


export type ResumeTestMutation = { __typename?: 'Mutation', resumeTest: { __typename?: 'Test', id: string, status: TestStatusType } };

export type StartAssignedTestMutationVariables = Exact<{
  assignmentId: Scalars['String']['input'];
  mode?: InputMaybe<TestModeType>;
}>;


export type StartAssignedTestMutation = { __typename?: 'Mutation', startAssignedTest: { __typename?: 'Test', id: string, status: TestStatusType, course_id?: string | null } };

export type StartTestMutationVariables = Exact<{
  suiteId: Scalars['String']['input'];
  mode?: InputMaybe<TestModeType>;
}>;


export type StartTestMutation = { __typename?: 'Mutation', startTest: { __typename?: 'Test', id: string, status: TestStatusType } };

export type SubmitAnswerMutationVariables = Exact<{
  testId: Scalars['String']['input'];
  questionId: Scalars['String']['input'];
  timeRange: Scalars['String']['input'];
  answer: Scalars['String']['input'];
  isFlagged: Scalars['Boolean']['input'];
}>;


export type SubmitAnswerMutation = { __typename?: 'Mutation', submitAnswer: { __typename?: 'SubmittedAnswer', answer_provided: string, hints_used: Array<string>, id: string, is_flagged: boolean, is_correct?: boolean | null, is_marked: boolean, question_id: string } };

export type VerifyStudentCancellationOtpMutationVariables = Exact<{
  otp: Scalars['String']['input'];
}>;


export type VerifyStudentCancellationOtpMutation = { __typename?: 'Mutation', verifyCancellationOtp: { __typename?: 'RegisterParentResponse', message: string } };

export type VerifyChildUsernameMutationVariables = Exact<{
  input: VerifyChildUsernameInput;
}>;


export type VerifyChildUsernameMutation = { __typename?: 'Mutation', verifyChildUsername: { __typename?: 'VerifyChildUsernameResponse', temp_token: string } };

export type GetActiveTestQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveTestQuery = { __typename?: 'Query', getActiveTest: { __typename?: 'Test', id: string, mode: TestModeType, status: TestStatusType, course_id?: string | null } };

export type GetAllAttemptedQuestionsQueryVariables = Exact<{
  testId: Scalars['String']['input'];
}>;


export type GetAllAttemptedQuestionsQuery = { __typename?: 'Query', getAllAttemptedQuestions: Array<{ __typename?: 'SubmittedAnswer', answer_provided: string, question_id: string, is_flagged: boolean, is_correct?: boolean | null, is_marked: boolean, question?: { __typename?: 'Question', type: QuestionType } | null }> };

export type GetCategoryCountdownQueryVariables = Exact<{
  categoryId: Scalars['String']['input'];
}>;


export type GetCategoryCountdownQuery = { __typename?: 'Query', getCategoryCountdown: { __typename?: 'CategoryCountdownResponse', categoryName: string, countdown?: number | null, exam_duration_days?: number | null } };

export type GetCurrentStreakCountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentStreakCountQuery = { __typename?: 'Query', getCurrentStreakCount: { __typename?: 'StreakResponse', current_streak: number, best_streak: number } };

export type GetOrganizationCourseQueryVariables = Exact<{
  courseId: Scalars['String']['input'];
}>;


export type GetOrganizationCourseQuery = { __typename?: 'Query', getOrganizationCourse: { __typename?: 'StudentCourseResponse', id: string, avatar_url: string, currency: CurrencyType, description: string, domains: Array<DomainType>, level: LevelType, price: number, title: string, is_subscribed: boolean, is_course_in_cart: boolean, instructor?: { __typename?: 'Instructor', id: string, email: string, name: string } | null } };

export type GetQuestionQueryVariables = Exact<{
  testId: Scalars['String']['input'];
}>;


export type GetQuestionQuery = { __typename?: 'Query', getQuestion: { __typename?: 'Question', description: string, difficulty: QuestionDifficultyType, estimated_time_in_ms: number, hints: Array<string>, id: string, options?: Array<string> | null, question_number: number, solution_steps: Array<string>, tags: Array<QuestionTagType>, type: QuestionType } };

export type GetStudentAggregateQueryVariables = Exact<{
  categoryId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetStudentAggregateQuery = { __typename?: 'Query', getStudentAggregate: { __typename?: 'StudentAggregateResponse', state: StudentAggregateStateType, message: string, aggregate_range?: string | null, required_subjects_count: number, tested_required_subjects_count: number, category_id: string, category_name: string, grading_system: CategoryGradingSystemType, courses_with_test_taken: Array<{ __typename?: 'CourseAggregateEntry', course_id: string, course_title: string, is_mandatory: boolean, score?: number | null, grade?: string | null, date_taken?: any | null }>, courses_without_test_taken: Array<{ __typename?: 'CourseAggregateEntry', course_id: string, course_title: string, is_mandatory: boolean }> } };

export type GetStudentStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStudentStatsQuery = { __typename?: 'Query', getStudentStats: { __typename?: 'StudentStatsResponse', total_test_taken: number, total_test_taken_percentage_change: number, average_score: number, average_score_percentage_change: number, study_hours: number, weak_areas_count: number } };

export type GetStudentSubscriptionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStudentSubscriptionQuery = { __typename?: 'Query', getMyStudentSubscription?: { __typename?: 'StudentSubscription', id: string, status: SubscriptionStatus, started_at: any, expires_at: any, plan: { __typename?: 'SubscriptionPlan', id: string, name: string, price: number, currency: string, interval: PlanInterval, duration_days: number } } | null };

export type GetSubscribedCourseDetailsQueryVariables = Exact<{
  courseId: Scalars['String']['input'];
}>;


export type GetSubscribedCourseDetailsQuery = { __typename?: 'Query', getSubscribedCourseDetails: { __typename?: 'Course', id: string, avatar_url: string, currency: CurrencyType, description: string, domains: Array<DomainType>, level: LevelType, price: number, title: string, instructor?: { __typename?: 'Instructor', id: string, email: string, name: string } | null, approved_version?: { __typename?: 'Version', id: string, questions?: Array<{ __typename?: 'Question', id: string, question_number: number, description: string, options?: Array<string> | null, hints: Array<string>, estimated_time_in_ms: number, difficulty: QuestionDifficultyType, correct_answer: string, solution_steps: Array<string>, tags: Array<QuestionTagType>, type: QuestionType, marks: number }> | null, test_suites?: Array<{ __typename?: 'TestSuite', id: string, description?: string | null, keywords?: Array<string> | null, title?: string | null, difficulty: SuiteDifficultyType, suite_type?: SuiteType | null, questions?: Array<{ __typename?: 'Question', id: string }> | null }> | null } | null } };

export type GetTestScoreHistoryQueryVariables = Exact<{
  testId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetTestScoreHistoryQuery = { __typename?: 'Query', getTestScoreHistory: Array<{ __typename?: 'TestScoreHistoryResponse', test_id: string, course_title: string, score: number, date_taken: any }> };

export type GetTestQueryVariables = Exact<{
  testId: Scalars['String']['input'];
}>;


export type GetTestQuery = { __typename?: 'Query', getTest: { __typename?: 'Test', course_id?: string | null, course_category?: string | null, id: string, mode: TestModeType, status: TestStatusType, submitted_answers?: Array<{ __typename?: 'SubmittedAnswer', id: string, answer_provided: string, hints_used: Array<string>, is_flagged: boolean, question_id: string, is_correct?: boolean | null, is_marked: boolean, question?: { __typename?: 'Question', id: string, marks: number, question_number: number, description: string, hints: Array<string>, solution_steps: Array<string>, options?: Array<string> | null, type: QuestionType, tags: Array<QuestionTagType>, class_level?: QuestionClassLevel | null, exam_year?: number | null, correct_answer: string, difficulty: QuestionDifficultyType, estimated_time_in_ms: number } | null }> | null, test_suite?: { __typename?: 'TestSuite', title?: string | null, id: string, difficulty: SuiteDifficultyType, description?: string | null, questions?: Array<{ __typename?: 'Question', id: string, marks: number, question_number: number, description: string, hints: Array<string>, solution_steps: Array<string>, options?: Array<string> | null, type: QuestionType, tags: Array<QuestionTagType>, class_level?: QuestionClassLevel | null, exam_year?: number | null, correct_answer: string, difficulty: QuestionDifficultyType, estimated_time_in_ms: number }> | null } | null, time_events?: Array<{ __typename?: 'TimeEvent', type: TimeEventType, recorded_at: any }> | null } };

export type GetWeeklyInsightQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWeeklyInsightQuery = { __typename?: 'Query', getWeeklyInsight?: { __typename?: 'WeeklyInsight', title: string, description: string, suites: Array<{ __typename?: 'WeeklyInsightSuite', suite_id: string, title: string, accuracy: number }> } | null };

export type ListAttemptsQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AttemptFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type ListAttemptsQuery = { __typename?: 'Query', listAttempts: { __typename?: 'AttemptConnection', count: number, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null }, edges: Array<{ __typename?: 'AttemptResponseEdge', node: { __typename?: 'AttemptResponse', id: string, course_id: string, date_taken: any, course_title: string, correct: number, mode: TestModeType, score: number, status: TestStatusType, time_taken: number, trend?: number | null, wrong: number } }> } };

export type ListCartCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListCartCoursesQuery = { __typename?: 'Query', listCartCourses: Array<{ __typename?: 'Course', id: string, avatar_url: string, currency: CurrencyType, description: string, domains: Array<DomainType>, level: LevelType, price: number, title: string, instructor?: { __typename?: 'Instructor', id: string, email: string, name: string } | null }> };

export type ListCourseSuitesQueryVariables = Exact<{
  courseId: Scalars['String']['input'];
  suiteTypes?: InputMaybe<Array<SuiteType> | SuiteType>;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type ListCourseSuitesQuery = { __typename?: 'Query', listCourseSuites: { __typename?: 'TestSuiteConnection', count: number, edges: Array<{ __typename?: 'TestSuiteEdge', node: { __typename?: 'TestSuite', id: string, title?: string | null, description?: string | null, keywords?: Array<string> | null, difficulty: SuiteDifficultyType, suite_type?: SuiteType | null, image_url?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type ListCoursesForOrganizationQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type ListCoursesForOrganizationQuery = { __typename?: 'Query', listCoursesForOrganization: { __typename?: 'CourseConnection', count: number, edges: Array<{ __typename?: 'CourseResponseEdge', node: { __typename?: 'CourseResponse', id: string, avatar_url: string, estimated_duration: number, domains: Array<DomainType>, description: string, currency: CurrencyType, inserted_at: any, is_subscribed: boolean, level: LevelType, price: number, title: string, total_questions: number, updated_at: any, instructor?: { __typename?: 'Instructor', id: string, name: string, email: string, status: InstructorStatusType } | null } }> } };

export type ListMyAssignmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListMyAssignmentsQuery = { __typename?: 'Query', listMyAssignments: Array<{ __typename?: 'TestAssignment', id: string, status: TestAssignmentStatus, assigned_at: any, completed_at?: any | null, note?: string | null, parent?: { __typename?: 'Parent', first_name: string, last_name: string, gender: Gender } | null, test_suite?: { __typename?: 'TestSuite', id: string, title?: string | null, description?: string | null, difficulty: SuiteDifficultyType } | null, test?: { __typename?: 'Test', id: string, status: TestStatusType, course_id?: string | null } | null }> };

export type ListOrganizationCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ListOrganizationCategoriesQuery = { __typename?: 'Query', listOrganizationCategories: Array<{ __typename?: 'Category', id: string, name: string, courses?: Array<{ __typename?: 'Course', id: string, level: LevelType, price: number, title: string, domains: Array<DomainType>, description: string, currency: CurrencyType, avatar_url: string, is_mandatory: boolean }> | null }> };

export type ListOrganizationCoursesQueryVariables = Exact<{
  organizationId?: InputMaybe<Scalars['String']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<CourseFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type ListOrganizationCoursesQuery = { __typename?: 'Query', listOrganizationCourses: { __typename?: 'CourseConnection', edges: Array<{ __typename?: 'CourseResponseEdge', node: { __typename?: 'CourseResponse', id: string, avatar_url: string, currency: CurrencyType, description: string, domains: Array<DomainType>, is_subscribed: boolean, level: LevelType, price: number, title: string, total_questions: number, estimated_duration: number, updated_at: any, inserted_at: any, approved_version?: { __typename?: 'Version', id: string, status: VersionStatusType, inserted_at: any, updated_at: any, version_number: number, test_suites?: Array<{ __typename?: 'TestSuite', id: string, description?: string | null, difficulty: SuiteDifficultyType, keywords?: Array<string> | null, suite_type?: SuiteType | null, image_url?: string | null, title?: string | null }> | null } | null } }> } };

export type ListOrganizationsQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type ListOrganizationsQuery = { __typename?: 'Query', listOrganizations: { __typename?: 'OrganizationConnection', edges: Array<{ __typename?: 'OrganizationEdge', node: { __typename?: 'Organization', name: string, id: string } }> } };

export type ListStudentSubscriptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListStudentSubscriptionsQuery = { __typename?: 'Query', listMyStudentSubscriptions: Array<{ __typename?: 'StudentSubscription', id: string, status: SubscriptionStatus, started_at: any, expires_at: any, plan: { __typename?: 'SubscriptionPlan', id: string, name: string, price: number, currency: string, interval: PlanInterval, duration_days: number } }> };

export type ListSubscriptionPlansQueryVariables = Exact<{ [key: string]: never; }>;


export type ListSubscriptionPlansQuery = { __typename?: 'Query', listSubscriptionPlans: Array<{ __typename?: 'SubscriptionPlan', id: string, plan_key: string, name: string, tagline?: string | null, price: number, currency: string, interval: PlanInterval, duration_days: number, features: Array<string>, billing_label?: string | null }> };

export type LoginStudentQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginStudentQuery = { __typename?: 'Query', loginStudent: { __typename?: 'StudentLoginResponse', id: string, email: string, name: string, token: string, refresh_token?: string | null, account_status?: AccountStatus | null, deletion_scheduled_for?: any | null, is_setup_completed: boolean, organizations?: Array<{ __typename?: 'Organization', id: string, email: string }> | null } };

export type StudentProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type StudentProfileQuery = { __typename?: 'Query', studentProfile: { __typename?: 'Student', id: string, name: string, email: string, is_setup_completed: boolean, organizations?: Array<{ __typename?: 'Organization', id: string, email: string }> | null, subscribed_categories?: Array<{ __typename?: 'Category', id: string, name: string }> | null } };

export type StudentSubjectProgressQueryVariables = Exact<{
  testId?: InputMaybe<Scalars['String']['input']>;
}>;


export type StudentSubjectProgressQuery = { __typename?: 'Query', studentSubjectProgress: Array<{ __typename?: 'SubjectProgressResponse', subject: string, total: number, correct: number, wrong: number, score: number }> };

export type StudentTestTopicProgressQueryVariables = Exact<{
  testId: Scalars['String']['input'];
}>;


export type StudentTestTopicProgressQuery = { __typename?: 'Query', studentTestTopicProgress: Array<{ __typename?: 'TestTopicProgressResponse', topic: string, total: number, correct: number, wrong: number, score: number }> };

export type TestStatsQueryVariables = Exact<{
  testId: Scalars['String']['input'];
}>;


export type TestStatsQuery = { __typename?: 'Query', testStats: { __typename?: 'Test', status: TestStatusType, id: string, submitted_answers?: Array<{ __typename?: 'SubmittedAnswer', answer_provided: string, hints_used: Array<string>, id: string, is_flagged: boolean, is_correct?: boolean | null, is_marked: boolean, question_id: string, question?: { __typename?: 'Question', correct_answer: string, description: string, difficulty: QuestionDifficultyType, estimated_time_in_ms: number, hints: Array<string>, id: string, marks: number, options?: Array<string> | null, question_number: number, solution_steps: Array<string>, tags: Array<QuestionTagType>, type: QuestionType } | null }> | null, test_suite?: { __typename?: 'TestSuite', id: string, questions?: Array<{ __typename?: 'Question', correct_answer: string, description: string, difficulty: QuestionDifficultyType, estimated_time_in_ms: number, id: string, marks: number, options?: Array<string> | null, question_number: number, solution_steps: Array<string>, tags: Array<QuestionTagType>, type: QuestionType, hints: Array<string> }> | null } | null } };

export type WeakSubjectAreasQueryVariables = Exact<{
  testId?: InputMaybe<Scalars['String']['input']>;
}>;


export type WeakSubjectAreasQuery = { __typename?: 'Query', weakSubjectAreas: Array<{ __typename?: 'WeakSubjectAreaResponse', subject: string, error_count: number, total: number, accuracy: number, questions: Array<{ __typename?: 'Question', id: string, question_number: number, description: string, hints: Array<string>, solution_steps: Array<string>, options?: Array<string> | null, type: QuestionType, tags: Array<QuestionTagType>, correct_answer: string, difficulty: QuestionDifficultyType, estimated_time_in_ms: number }> }> };


export const ActivateStudentDemoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateStudentDemo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActivateStudentDemoInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activateStudentDemo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"is_setup_completed"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}}]}}]}}]} as unknown as DocumentNode<ActivateStudentDemoMutation, ActivateStudentDemoMutationVariables>;
export const AddCourseToCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddCourseToCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addCourseToCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddCourseToCartMutation, AddCourseToCartMutationVariables>;
export const CancelStudentAccountDeletionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelStudentAccountDeletion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelStudentAccountDeletion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"account_status"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"is_setup_completed"}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<CancelStudentAccountDeletionMutation, CancelStudentAccountDeletionMutationVariables>;
export const ChangePinDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangePin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentPin"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPin"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"currentPin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentPin"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPin"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ChangePinMutation, ChangePinMutationVariables>;
export const ChangeStudentPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeStudentPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"changePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"currentPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentPassword"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPassword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPassword"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ChangeStudentPasswordMutation, ChangeStudentPasswordMutationVariables>;
export const CompleteSetupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteSetup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeSetup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"courseIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"is_setup_completed"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CompleteSetupMutation, CompleteSetupMutationVariables>;
export const CompleteStudentAccountValidationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteStudentAccountValidation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"validationCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeStudentAccountValidation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"validation_code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"validationCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<CompleteStudentAccountValidationMutation, CompleteStudentAccountValidationMutationVariables>;
export const CreateCheckoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCheckout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"autoApproveSubscription"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"checkoutFromCart"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCheckout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"autoApproveSubscription"},"value":{"kind":"Variable","name":{"kind":"Name","value":"autoApproveSubscription"}}},{"kind":"Argument","name":{"kind":"Name","value":"checkoutFromCart"},"value":{"kind":"Variable","name":{"kind":"Name","value":"checkoutFromCart"}}},{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCheckoutMutation, CreateCheckoutMutationVariables>;
export const EndTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EndTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<EndTestMutation, EndTestMutationVariables>;
export const InitiatePaymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InitiatePayment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"planId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"children"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initiatePayment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"planId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"planId"}}},{"kind":"Argument","name":{"kind":"Name","value":"children"},"value":{"kind":"Variable","name":{"kind":"Name","value":"children"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorization_url"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}}]}}]}}]} as unknown as DocumentNode<InitiatePaymentMutation, InitiatePaymentMutationVariables>;
export const LoginChildDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginChild"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginChildInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginChild"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"class_level"}},{"kind":"Field","name":{"kind":"Name","value":"target_exam"}},{"kind":"Field","name":{"kind":"Name","value":"school_name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"student"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"is_setup_completed"}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LoginChildMutation, LoginChildMutationVariables>;
export const PauseTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PauseTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pauseTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<PauseTestMutation, PauseTestMutationVariables>;
export const RefreshStudentTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshStudentToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshStudentToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refresh_token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<RefreshStudentTokenMutation, RefreshStudentTokenMutationVariables>;
export const RegisterStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RegisterStudentMutation, RegisterStudentMutationVariables>;
export const RemoveCourseFromCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCourseFromCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCourseFromCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveCourseFromCartMutation, RemoveCourseFromCartMutationVariables>;
export const RequestStudentAccountDeletionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestStudentAccountDeletion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestStudentAccountDeletion"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"deletionScheduledFor"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<RequestStudentAccountDeletionMutation, RequestStudentAccountDeletionMutationVariables>;
export const RequestStudentPasswordResetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestStudentPasswordReset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestStudentPasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<RequestStudentPasswordResetMutation, RequestStudentPasswordResetMutationVariables>;
export const ResendAccountValidationCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResendAccountValidationCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resendAccountValidationCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ResendAccountValidationCodeMutation, ResendAccountValidationCodeMutationVariables>;
export const ResetStudentPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetStudentPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetStudentPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ResetStudentPasswordMutation, ResetStudentPasswordMutationVariables>;
export const ResumeTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResumeTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resumeTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<ResumeTestMutation, ResumeTestMutationVariables>;
export const StartAssignedTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartAssignedTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assignmentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TestModeType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startAssignedTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"assignmentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assignmentId"}}},{"kind":"Argument","name":{"kind":"Name","value":"mode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"course_id"}}]}}]}}]} as unknown as DocumentNode<StartAssignedTestMutation, StartAssignedTestMutationVariables>;
export const StartTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"suiteId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TestModeType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"suiteId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"suiteId"}}},{"kind":"Argument","name":{"kind":"Name","value":"mode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<StartTestMutation, StartTestMutationVariables>;
export const SubmitAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timeRange"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"answer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isFlagged"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}},{"kind":"Argument","name":{"kind":"Name","value":"questionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questionId"}}},{"kind":"Argument","name":{"kind":"Name","value":"timeRange"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timeRange"}}},{"kind":"Argument","name":{"kind":"Name","value":"answer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"answer"}}},{"kind":"Argument","name":{"kind":"Name","value":"isFlagged"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isFlagged"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answer_provided"}},{"kind":"Field","name":{"kind":"Name","value":"hints_used"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"is_flagged"}},{"kind":"Field","name":{"kind":"Name","value":"is_correct"}},{"kind":"Field","name":{"kind":"Name","value":"is_marked"}},{"kind":"Field","name":{"kind":"Name","value":"question_id"}}]}}]}}]} as unknown as DocumentNode<SubmitAnswerMutation, SubmitAnswerMutationVariables>;
export const VerifyStudentCancellationOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyStudentCancellationOtp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"otp"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyCancellationOtp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"otp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"otp"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<VerifyStudentCancellationOtpMutation, VerifyStudentCancellationOtpMutationVariables>;
export const VerifyChildUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyChildUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyChildUsernameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyChildUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"temp_token"}}]}}]}}]} as unknown as DocumentNode<VerifyChildUsernameMutation, VerifyChildUsernameMutationVariables>;
export const GetActiveTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetActiveTest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getActiveTest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"course_id"}}]}}]}}]} as unknown as DocumentNode<GetActiveTestQuery, GetActiveTestQueryVariables>;
export const GetAllAttemptedQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllAttemptedQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllAttemptedQuestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answer_provided"}},{"kind":"Field","name":{"kind":"Name","value":"question_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_flagged"}},{"kind":"Field","name":{"kind":"Name","value":"is_correct"}},{"kind":"Field","name":{"kind":"Name","value":"is_marked"}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllAttemptedQuestionsQuery, GetAllAttemptedQuestionsQueryVariables>;
export const GetCategoryCountdownDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategoryCountdown"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategoryCountdown"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categoryName"}},{"kind":"Field","name":{"kind":"Name","value":"countdown"}},{"kind":"Field","name":{"kind":"Name","value":"exam_duration_days"}}]}}]}}]} as unknown as DocumentNode<GetCategoryCountdownQuery, GetCategoryCountdownQueryVariables>;
export const GetCurrentStreakCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrentStreakCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCurrentStreakCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"current_streak"}},{"kind":"Field","name":{"kind":"Name","value":"best_streak"}}]}}]}}]} as unknown as DocumentNode<GetCurrentStreakCountQuery, GetCurrentStreakCountQueryVariables>;
export const GetOrganizationCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrganizationCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOrganizationCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"domains"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"is_subscribed"}},{"kind":"Field","name":{"kind":"Name","value":"is_course_in_cart"}}]}}]}}]} as unknown as DocumentNode<GetOrganizationCourseQuery, GetOrganizationCourseQueryVariables>;
export const GetQuestionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuestion"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getQuestion"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"estimated_time_in_ms"}},{"kind":"Field","name":{"kind":"Name","value":"hints"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"question_number"}},{"kind":"Field","name":{"kind":"Name","value":"solution_steps"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetQuestionQuery, GetQuestionQueryVariables>;
export const GetStudentAggregateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudentAggregate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStudentAggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"aggregate_range"}},{"kind":"Field","name":{"kind":"Name","value":"required_subjects_count"}},{"kind":"Field","name":{"kind":"Name","value":"tested_required_subjects_count"}},{"kind":"Field","name":{"kind":"Name","value":"category_id"}},{"kind":"Field","name":{"kind":"Name","value":"category_name"}},{"kind":"Field","name":{"kind":"Name","value":"grading_system"}},{"kind":"Field","name":{"kind":"Name","value":"courses_with_test_taken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"course_id"}},{"kind":"Field","name":{"kind":"Name","value":"course_title"}},{"kind":"Field","name":{"kind":"Name","value":"is_mandatory"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"grade"}},{"kind":"Field","name":{"kind":"Name","value":"date_taken"}}]}},{"kind":"Field","name":{"kind":"Name","value":"courses_without_test_taken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"course_id"}},{"kind":"Field","name":{"kind":"Name","value":"course_title"}},{"kind":"Field","name":{"kind":"Name","value":"is_mandatory"}}]}}]}}]}}]} as unknown as DocumentNode<GetStudentAggregateQuery, GetStudentAggregateQueryVariables>;
export const GetStudentStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudentStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStudentStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total_test_taken"}},{"kind":"Field","name":{"kind":"Name","value":"total_test_taken_percentage_change"}},{"kind":"Field","name":{"kind":"Name","value":"average_score"}},{"kind":"Field","name":{"kind":"Name","value":"average_score_percentage_change"}},{"kind":"Field","name":{"kind":"Name","value":"study_hours"}},{"kind":"Field","name":{"kind":"Name","value":"weak_areas_count"}}]}}]}}]} as unknown as DocumentNode<GetStudentStatsQuery, GetStudentStatsQueryVariables>;
export const GetStudentSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStudentSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMyStudentSubscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"started_at"}},{"kind":"Field","name":{"kind":"Name","value":"expires_at"}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"duration_days"}}]}}]}}]}}]} as unknown as DocumentNode<GetStudentSubscriptionQuery, GetStudentSubscriptionQueryVariables>;
export const GetSubscribedCourseDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubscribedCourseDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSubscribedCourseDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"domains"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"approved_version"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"hints"}},{"kind":"Field","name":{"kind":"Name","value":"estimated_time_in_ms"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"correct_answer"}},{"kind":"Field","name":{"kind":"Name","value":"solution_steps"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"marks"}}]}},{"kind":"Field","name":{"kind":"Name","value":"test_suites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"suite_type"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSubscribedCourseDetailsQuery, GetSubscribedCourseDetailsQueryVariables>;
export const GetTestScoreHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTestScoreHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTestScoreHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"test_id"}},{"kind":"Field","name":{"kind":"Name","value":"course_title"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"date_taken"}}]}}]}}]} as unknown as DocumentNode<GetTestScoreHistoryQuery, GetTestScoreHistoryQueryVariables>;
export const GetTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getTest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"course_id"}},{"kind":"Field","name":{"kind":"Name","value":"course_category"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"submitted_answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"answer_provided"}},{"kind":"Field","name":{"kind":"Name","value":"hints_used"}},{"kind":"Field","name":{"kind":"Name","value":"is_flagged"}},{"kind":"Field","name":{"kind":"Name","value":"question_id"}},{"kind":"Field","name":{"kind":"Name","value":"is_correct"}},{"kind":"Field","name":{"kind":"Name","value":"is_marked"}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marks"}},{"kind":"Field","name":{"kind":"Name","value":"question_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"hints"}},{"kind":"Field","name":{"kind":"Name","value":"solution_steps"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"class_level"}},{"kind":"Field","name":{"kind":"Name","value":"exam_year"}},{"kind":"Field","name":{"kind":"Name","value":"correct_answer"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"estimated_time_in_ms"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"test_suite"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marks"}},{"kind":"Field","name":{"kind":"Name","value":"question_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"hints"}},{"kind":"Field","name":{"kind":"Name","value":"solution_steps"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"class_level"}},{"kind":"Field","name":{"kind":"Name","value":"exam_year"}},{"kind":"Field","name":{"kind":"Name","value":"correct_answer"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"estimated_time_in_ms"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"time_events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"recorded_at"}}]}}]}}]}}]} as unknown as DocumentNode<GetTestQuery, GetTestQueryVariables>;
export const GetWeeklyInsightDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWeeklyInsight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWeeklyInsight"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"suites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"suite_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"accuracy"}}]}}]}}]}}]} as unknown as DocumentNode<GetWeeklyInsightQuery, GetWeeklyInsightQueryVariables>;
export const ListAttemptsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListAttempts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AttemptFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listAttempts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"course_id"}},{"kind":"Field","name":{"kind":"Name","value":"date_taken"}},{"kind":"Field","name":{"kind":"Name","value":"course_title"}},{"kind":"Field","name":{"kind":"Name","value":"correct"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"time_taken"}},{"kind":"Field","name":{"kind":"Name","value":"trend"}},{"kind":"Field","name":{"kind":"Name","value":"wrong"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListAttemptsQuery, ListAttemptsQueryVariables>;
export const ListCartCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListCartCourses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listCartCourses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"domains"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<ListCartCoursesQuery, ListCartCoursesQueryVariables>;
export const ListCourseSuitesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListCourseSuites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"suiteTypes"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SuiteType"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listCourseSuites"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"courseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"courseId"}}},{"kind":"Argument","name":{"kind":"Name","value":"suiteTypes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"suiteTypes"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"suite_type"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<ListCourseSuitesQuery, ListCourseSuitesQueryVariables>;
export const ListCoursesForOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListCoursesForOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listCoursesForOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"estimated_duration"}},{"kind":"Field","name":{"kind":"Name","value":"domains"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"inserted_at"}},{"kind":"Field","name":{"kind":"Name","value":"is_subscribed"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"total_questions"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"instructor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListCoursesForOrganizationQuery, ListCoursesForOrganizationQueryVariables>;
export const ListMyAssignmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListMyAssignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listMyAssignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assigned_at"}},{"kind":"Field","name":{"kind":"Name","value":"completed_at"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"parent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}}]}},{"kind":"Field","name":{"kind":"Name","value":"test_suite"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}}]}},{"kind":"Field","name":{"kind":"Name","value":"test"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"course_id"}}]}}]}}]}}]} as unknown as DocumentNode<ListMyAssignmentsQuery, ListMyAssignmentsQueryVariables>;
export const ListOrganizationCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListOrganizationCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listOrganizationCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"courses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"domains"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"is_mandatory"}}]}}]}}]}}]} as unknown as DocumentNode<ListOrganizationCategoriesQuery, ListOrganizationCategoriesQueryVariables>;
export const ListOrganizationCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListOrganizationCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CourseFilterInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listOrganizationCourses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_url"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"domains"}},{"kind":"Field","name":{"kind":"Name","value":"is_subscribed"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"total_questions"}},{"kind":"Field","name":{"kind":"Name","value":"estimated_duration"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"inserted_at"}},{"kind":"Field","name":{"kind":"Name","value":"approved_version"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"inserted_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"version_number"}},{"kind":"Field","name":{"kind":"Name","value":"test_suites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"suite_type"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListOrganizationCoursesQuery, ListOrganizationCoursesQueryVariables>;
export const ListOrganizationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListOrganizations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listOrganizations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ListOrganizationsQuery, ListOrganizationsQueryVariables>;
export const ListStudentSubscriptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListStudentSubscriptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listMyStudentSubscriptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"started_at"}},{"kind":"Field","name":{"kind":"Name","value":"expires_at"}},{"kind":"Field","name":{"kind":"Name","value":"plan"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"duration_days"}}]}}]}}]}}]} as unknown as DocumentNode<ListStudentSubscriptionsQuery, ListStudentSubscriptionsQueryVariables>;
export const ListSubscriptionPlansDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ListSubscriptionPlans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listSubscriptionPlans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"plan_key"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"interval"}},{"kind":"Field","name":{"kind":"Name","value":"duration_days"}},{"kind":"Field","name":{"kind":"Name","value":"features"}},{"kind":"Field","name":{"kind":"Name","value":"billing_label"}}]}}]}}]} as unknown as DocumentNode<ListSubscriptionPlansQuery, ListSubscriptionPlansQueryVariables>;
export const LoginStudentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LoginStudent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginStudent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"account_status"}},{"kind":"Field","name":{"kind":"Name","value":"deletion_scheduled_for"}},{"kind":"Field","name":{"kind":"Name","value":"is_setup_completed"}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<LoginStudentQuery, LoginStudentQueryVariables>;
export const StudentProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StudentProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"is_setup_completed"}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subscribed_categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<StudentProfileQuery, StudentProfileQueryVariables>;
export const StudentSubjectProgressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StudentSubjectProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentSubjectProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"correct"}},{"kind":"Field","name":{"kind":"Name","value":"wrong"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}}]} as unknown as DocumentNode<StudentSubjectProgressQuery, StudentSubjectProgressQueryVariables>;
export const StudentTestTopicProgressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StudentTestTopicProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentTestTopicProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"correct"}},{"kind":"Field","name":{"kind":"Name","value":"wrong"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}}]} as unknown as DocumentNode<StudentTestTopicProgressQuery, StudentTestTopicProgressQueryVariables>;
export const TestStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TestStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"testStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitted_answers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"answer_provided"}},{"kind":"Field","name":{"kind":"Name","value":"hints_used"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"is_flagged"}},{"kind":"Field","name":{"kind":"Name","value":"is_correct"}},{"kind":"Field","name":{"kind":"Name","value":"is_marked"}},{"kind":"Field","name":{"kind":"Name","value":"question"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"correct_answer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"estimated_time_in_ms"}},{"kind":"Field","name":{"kind":"Name","value":"hints"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marks"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"question_number"}},{"kind":"Field","name":{"kind":"Name","value":"solution_steps"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"question_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"test_suite"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"correct_answer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"estimated_time_in_ms"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"marks"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"question_number"}},{"kind":"Field","name":{"kind":"Name","value":"solution_steps"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"hints"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TestStatsQuery, TestStatsQueryVariables>;
export const WeakSubjectAreasDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WeakSubjectAreas"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"testId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"weakSubjectAreas"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"testId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"testId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subject"}},{"kind":"Field","name":{"kind":"Name","value":"error_count"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"accuracy"}},{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question_number"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"hints"}},{"kind":"Field","name":{"kind":"Name","value":"solution_steps"}},{"kind":"Field","name":{"kind":"Name","value":"options"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"correct_answer"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"estimated_time_in_ms"}}]}}]}}]}}]} as unknown as DocumentNode<WeakSubjectAreasQuery, WeakSubjectAreasQueryVariables>;