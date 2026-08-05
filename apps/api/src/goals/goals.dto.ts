import { Type } from "class-transformer";
import {
  IsIn,
  IsISO8601,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";
import {
  goalCategories,
  goalStatuses,
  initialLearningLanguages,
  proficiencyFrameworks,
  supportedUiLocales,
  type GoalCategory,
  type GoalStatus,
  type LearningLanguage,
  type ProficiencyFramework,
  type UiLocale,
} from "@levelup/contracts";

export class UpsertLanguageProfileDto {
  @IsIn(supportedUiLocales)
  uiLocale!: UiLocale;

  @IsIn(initialLearningLanguages)
  learningLanguage!: LearningLanguage;

  @IsIn(initialLearningLanguages)
  explanationLanguage!: LearningLanguage;

  @IsIn(proficiencyFrameworks)
  proficiencyFramework!: ProficiencyFramework;

  @IsString()
  @Length(1, 32)
  proficiencyLevel!: string;
}

export class CreateGoalDto {
  @IsIn(goalCategories)
  category!: GoalCategory;

  @IsString()
  @Length(3, 120)
  title!: string;

  @IsString()
  @Length(10, 1_000)
  outcome!: string;

  @IsOptional()
  @IsISO8601({ strict: true })
  targetDate?: string;

  @IsOptional()
  @IsObject()
  baseline?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  constraints?: Record<string, unknown>;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpsertLanguageProfileDto)
  learningProfile?: UpsertLanguageProfileDto;
}

export class UpdateGoalStatusDto {
  @IsIn(goalStatuses)
  status!: GoalStatus;
}
