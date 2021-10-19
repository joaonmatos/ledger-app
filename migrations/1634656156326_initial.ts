import { MigrationBuilder } from "node-pg-migrate";
import {
  candidateKeyProperty,
  commonColumns,
  foreignKey,
  notNullProperty,
} from "../util/migration";

export const shorthands = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("users", {
    ...commonColumns,
    username: candidateKeyProperty("text"),
    passwordHash: notNullProperty("text"),
    email: candidateKeyProperty("text"),
  });

  pgm.createTable(
    "ledgers",
    {
      ...commonColumns,
      name: notNullProperty("text"),
      ownerId: foreignKey("users"),
    },
    {
      constraints: { unique: [["name", "ownerId"]] },
    }
  );

  pgm.createTable(
    "userLedgerMemberships",
    {
      ...commonColumns,
      userId: foreignKey("users"),
      ledgerId: foreignKey("ledgers"),
    },
    {
      constraints: {
        unique: [["userId", "ledgerId"]],
      },
    }
  );

  pgm.createTable("expenses", {
    ...commonColumns,
    title: notNullProperty("text"),
    millicurrencyAmount: notNullProperty("bigint"),
    ledgerId: foreignKey("ledgers"),
    creditorId: foreignKey("users"),
  });

  pgm.createTable(
    "expenseFractions",
    {
      ...commonColumns,
      millicurrencyAmount: notNullProperty("bigint"),
      expenseId: foreignKey("expenses"),
      debtorId: foreignKey("users"),
    },
    {
      constraints: { unique: [["expenseId", "debtorId"]] },
    }
  );

  pgm.createTable("ledgerSettlements", {
    ...commonColumns,
    millicurrencyAmount: notNullProperty("bigint"),
    creditorId: foreignKey("users"),
    debtorId: foreignKey("users"),
    ledgerId: foreignKey("ledgers"),
  });
}

export const down = false;
