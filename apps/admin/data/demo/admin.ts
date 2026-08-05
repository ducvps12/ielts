export type AdminPermission =
  | "dashboard.read"
  | "users.read"
  | "goals.read"
  | "campaigns.read"
  | "quests.read"
  | "content.read"
  | "community.moderate"
  | "reports.read"
  | "notifications.read"
  | "settings.read"
  | "audit.read";

export interface AdminOperator {
  id: string;
  name: string;
  roleLabel: string;
  permissions: AdminPermission[];
}

export const demoAdminOperator: AdminOperator = {
  id: "demo-admin-operator",
  name: "Product Operator",
  roleLabel: "Super Admin Demo",
  permissions: [
    "dashboard.read",
    "users.read",
    "goals.read",
    "campaigns.read",
    "quests.read",
    "content.read",
    "community.moderate",
    "reports.read",
    "notifications.read",
    "settings.read",
    "audit.read",
  ],
};

export interface AdminMetricDefinition {
  id: string;
  label: string;
  value: string | null;
  description: string;
  permission: AdminPermission;
}

export const demoAdminMetrics: AdminMetricDefinition[] = [
  {
    id: "active-users",
    label: "Người dùng hoạt động",
    value: null,
    description: "Cần API aggregate và phạm vi thời gian rõ ràng.",
    permission: "users.read",
  },
  {
    id: "active-campaigns",
    label: "Campaign đang chạy",
    value: null,
    description: "Cần Campaign service và timezone thống nhất.",
    permission: "campaigns.read",
  },
  {
    id: "main-quest-completion",
    label: "Main Quest completion",
    value: null,
    description: "Cần event definition trước khi hiển thị tỷ lệ.",
    permission: "reports.read",
  },
  {
    id: "open-moderation",
    label: "Hàng đợi moderation",
    value: null,
    description: "Cần evidence/report queue từ API.",
    permission: "community.moderate",
  },
];

export interface DemoAdminTableRow {
  id: string;
  label: string;
  status: "ready" | "planned" | "disabled";
  owner: string;
  note: string;
}

export const demoAdminModules: DemoAdminTableRow[] = [
  {
    id: "identity",
    label: "Identity & RBAC",
    status: "planned",
    owner: "Identity",
    note: "Chưa có auth/session và permission API thật.",
  },
  {
    id: "goal-engine",
    label: "Goal Engine",
    status: "ready",
    owner: "Goals",
    note: "Schema nền đã có, service chưa triển khai.",
  },
  {
    id: "notifications",
    label: "Notification worker",
    status: "ready",
    owner: "Notifications",
    note: "Worker skeleton đã có, delivery chưa nối.",
  },
  {
    id: "commerce",
    label: "Commerce",
    status: "disabled",
    owner: "Commerce",
    note: "Feature flag phải mặc định tắt tới khi qua legal/security gate.",
  },
];
