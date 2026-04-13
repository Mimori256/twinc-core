# Changelog

## [0.3.0] - 2026-04-14 (https://github.com/Mimori256/twinc-core/pull/43)

### Breaking Changes

- `deadlinesDate` の要素数が 14 から 12 に変更（`春A期末試験`・`秋A期末試験` を削除）
- `deadlinesDetail` から `春A期末試験`・`秋A期末試験` を削除（`const/constData.ts`）
- `scheduleSchema` の `deadlinesDate` 長さバリデーションを 14 → 12 に変更（`types/scheduleSchema.ts`）

### Added

- `parse.ts`: 月末を跨ぐ日付インクリメントに対応するため `addOneDay` 関数を追加

### Fixed

- `parse.ts`: `DTSTAMP`・`CREATED` にハードコードされていたタイムスタンプを `schedule.json` の `timeStamp` フィールドから読み込むよう修正
- `parse.ts`: TWINS からエクスポートした CSV において最終行のコースが無視される問題を修正（`isFromKdbAlt` による分岐を削除し、常に `idList.length` を使用） (https://github.com/Mimori256/twinc-core/pull/44)

### Data

- `data/schedule.json`: 2026 年度の学年暦に更新
  - `springABCEndDate`・`fallABCEndDate` には各モジュールの EndDate.C の日付を採用
  - `springABCHolidays`・`fallABCHolidays` には春・秋 A/B/C の Holidays の和集合を採用
