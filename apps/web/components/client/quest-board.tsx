"use client";

import { useMemo, useState } from "react";
import { Badge, Button, EmptyState } from "@levelup/ui";
import { Search, Target } from "@levelup/ui/icons";

import type { DemoQuest, QuestState } from "../../data/demo/client";
import { QuestCard } from "./quest-card";

interface QuestBoardProps {
  quests: DemoQuest[];
}

type StatusFilter = "all" | QuestState;
type SkillFilter = "all" | DemoQuest["skill"];

const statusOptions: Array<{ value: StatusFilter; label: string }> = [
  { value: "all", label: "Tất cả" },
  { value: "in_progress", label: "Đang làm" },
  { value: "available", label: "Có thể làm" },
  { value: "completed", label: "Hoàn thành" },
  { value: "locked", label: "Chưa mở" },
];

const skillOptions: SkillFilter[] = [
  "all",
  "Listening",
  "Reading",
  "Writing",
  "Speaking",
];

export function QuestBoard({ quests }: QuestBoardProps) {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [skill, setSkill] = useState<SkillFilter>("all");
  const [query, setQuery] = useState("");

  const filteredQuests = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");
    return quests.filter((quest) => {
      const statusMatch = status === "all" || quest.state === status;
      const skillMatch = skill === "all" || quest.skill === skill;
      const queryMatch =
        normalizedQuery.length === 0 ||
        quest.title.toLocaleLowerCase("vi").includes(normalizedQuery) ||
        quest.description.toLocaleLowerCase("vi").includes(normalizedQuery);
      return statusMatch && skillMatch && queryMatch;
    });
  }, [query, quests, skill, status]);

  function resetFilters(): void {
    setStatus("all");
    setSkill("all");
    setQuery("");
  }

  return (
    <section className="client-quest-board" aria-labelledby="quest-board-title">
      <div className="client-section-heading-row">
        <div>
          <span>QUEST LIBRARY</span>
          <h2 id="quest-board-title">Tìm nhiệm vụ cần xử lý.</h2>
        </div>
        <Badge>{filteredQuests.length} kết quả</Badge>
      </div>

      <div className="client-filter-bar">
        <label className="client-filter-search">
          <span className="ui-visually-hidden">Tìm nhiệm vụ</span>
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm theo tên hoặc mô tả"
          />
        </label>

        <div className="client-filter-group" aria-label="Lọc trạng thái">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={status === option.value ? "is-active" : undefined}
              aria-pressed={status === option.value}
              onClick={() => setStatus(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <label className="client-filter-select">
          <span>Kỹ năng</span>
          <select
            value={skill}
            onChange={(event) => setSkill(event.target.value as SkillFilter)}
          >
            {skillOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "Tất cả kỹ năng" : option}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredQuests.length > 0 ? (
        <div className="client-quest-board__grid">
          {filteredQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Target size={24} aria-hidden="true" />}
          title="Không tìm thấy nhiệm vụ"
          description="Thử thay đổi từ khóa, kỹ năng hoặc trạng thái để xem thêm kết quả."
          action={{
            label: "Xóa bộ lọc",
            onClick: resetFilters,
          }}
        />
      )}

      <div className="client-quest-board__mobile-reset">
        <Button variant="outline" block onClick={resetFilters}>
          Xóa bộ lọc
        </Button>
      </div>
    </section>
  );
}
