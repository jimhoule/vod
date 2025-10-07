export class PostgresError extends Error {
	constructor(
		public name: 'PostgresError',
		public severity_local: string,
		public severity: string,
		public code: string,
		public position: string,
		public file: string,
		public line: string,
		public routine: string,

		public detail?: string | undefined,
		public hint?: string | undefined,
		public internal_position?: string | undefined,
		public internal_query?: string | undefined,
		public where?: string | undefined,
		public schema_name?: string | undefined,
		public table_name?: string | undefined,
		public column_name?: string | undefined,
		public data?: string | undefined,
		public type_name?: string | undefined,
		public constraint_name?: string | undefined,
	) {
		super();
	}
}
