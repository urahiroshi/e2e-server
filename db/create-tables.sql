USE e2e_server;

CREATE TABLE IF NOT EXISTS results (
  result_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  job_id INT UNSIGNED NOT NULL,
  screenshots_count TINYINT UNSIGNED NOT NULL,
  texts_count TINYINT UNSIGNED NOT NULL,
  htmls_count TINYINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (result_id)
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS result_texts (
  result_id INT UNSIGNED NOT NULL,
  name VARCHAR(40) NOT NULL,
  txt TEXT NOT NULL,
  FOREIGN KEY(result_id) REFERENCES results(result_id),
  PRIMARY KEY (result_id, name)
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS result_htmls (
  result_id INT UNSIGNED NOT NULL,
  name VARCHAR(40) NOT NULL,
  html TEXT NOT NULL,
  FOREIGN KEY(result_id) REFERENCES results(result_id),
  PRIMARY KEY (result_id, name)
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS result_screenshots (
  result_id INT UNSIGNED NOT NULL,
  name VARCHAR(40) NOT NULL,
  image BLOB NOT NULL,
  FOREIGN KEY(result_id) REFERENCES results(result_id),
  PRIMARY KEY (result_id, name)
) ENGINE InnoDB;
