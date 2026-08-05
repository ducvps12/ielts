import { Badge, Progress } from "@levelup/ui";
import { Flame, Wallet, Zap } from "@levelup/ui/icons";

import { BrandLogo } from "../marketing/brand-logo";
import { demoLearner } from "../../data/demo/client";
import {
  clientNavigation,
  isClientRouteActive,
} from "./client-navigation";

interface ClientSidebarProps {
  pathname: string;
  compact?: boolean;
  onNavigate?: () => void;
}

export function ClientSidebar({
  pathname,
  compact = false,
  onNavigate,
}: ClientSidebarProps) {
  const xpProgress = Math.round(
    (demoLearner.xp / demoLearner.nextLevelXp) * 100,
  );

  return (
    <aside
      className={compact ? "client-sidebar client-sidebar--compact" : "client-sidebar"}
      aria-label="Điều hướng tài khoản"
    >
      <div className="client-sidebar__brand">
        <BrandLogo compact={compact} />
      </div>

      <nav className="client-sidebar__nav">
        {clientNavigation.map((item) => {
          const Icon = item.icon;
          const active = isClientRouteActive(pathname, item.href);
          return (
            <a
              key={item.href}
              href={item.href}
              className={active ? "is-active" : undefined}
              aria-current={active ? "page" : undefined}
              aria-label={compact ? item.label : undefined}
              title={compact ? item.label : undefined}
              onClick={onNavigate}
            >
              <Icon size={20} aria-hidden="true" />
              {compact ? null : <span>{item.label}</span>}
            </a>
          );
        })}
      </nav>

      {compact ? null : (
        <div className="client-sidebar__campaign">
          <div className="client-sidebar__campaign-heading">
            <div>
              <span>Chiến dịch hiện tại</span>
              <strong>{demoLearner.goal}</strong>
            </div>
            <Badge tone="primary">
              Day {demoLearner.campaignDay}/{demoLearner.totalDays}
            </Badge>
          </div>
          <Progress
            label={`Level ${demoLearner.level}`}
            value={xpProgress}
            showValue
            size="sm"
          />
          <div className="client-sidebar__resources">
            <span>
              <Flame size={16} aria-hidden="true" />
              {demoLearner.streak} ngày
            </span>
            <span>
              <Zap size={16} aria-hidden="true" />
              {demoLearner.xp} XP
            </span>
            <span>
              <Wallet size={16} aria-hidden="true" />
              {demoLearner.gold}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
