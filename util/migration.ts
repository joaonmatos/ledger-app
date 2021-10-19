import {
  ColumnDefinition,
  ColumnDefinitions,
  PgLiteral,
} from "node-pg-migrate";

export const commonColumns: ColumnDefinitions = {
  id: {
    type: "serial",
    primaryKey: true,
  },
  createdAt: {
    type: "timestamp with time zone",
    notNull: true,
    default: new PgLiteral("current_timestamp"),
  },
  updatedAt: {
    type: "timestamp with time zone",
    notNull: true,
    default: new PgLiteral("current_timestamp"),
  },
  deletedAt: "timestamp with time zone",
};

export function candidateKeyProperty(type: string): ColumnDefinition {
  return {
    type,
    unique: true,
    notNull: true,
  };
}

export function notNullProperty(type: string): ColumnDefinition {
  return { type, notNull: true };
}

export function foreignKey(references: string): ColumnDefinition {
  return { references: `"${references}"("id")`, type: "int", notNull: true };
}
