declare enum PROJECT_STATUS {
  START = 1,
  STOP = 2,
  DELETED = 3
}
declare enum JOB_TYPE{
  hive = 3,
  spark = 12,
  shell = 11, 
  python = 20
}
declare enum JOB_STATUS {
  ENABLED = 1,
  DISABLE = 2,
  DELETED = 3
}
declare enum EXECUTE_TYPE {
  MANUAL = 0,
  SCHEDULER = 1,
  CUSTOM_SQL = 2,
  STREAMING = 3,
  TEST = 4,
  API = 5,
  MANUAL_RETRY = 6
}
declare enum COMMAND_TYPE {
  HIVE = 'hive-sql',
  HADOOP = 'Hadoop'
}
declare enum STORE_TYPE {
  MONGO = 1,
  MYSQL = 2,
  HBASE = 3,
  REDIS = 4,
  ES = 9
}