import type { Kdb } from "./types/Kdb";

const kdbUrl =
  "https://raw.githubusercontent.com/Mimori256/kdb-parse/main/kdb_twinc.json";

export const fetchKdb = async () => {
  const response = await fetch(kdbUrl);
  const kdb: Kdb = await response.json();
  return kdb;
};
