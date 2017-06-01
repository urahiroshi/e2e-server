USE e2e_server;

CREATE TABLE IF NOT EXISTS projects (
  project_id INT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (project_id)
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS project_iterations (
  project_id INT UNSIGNED NOT NULL,
  iteration_number INT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (project_id, iteration_number),
  FOREIGN KEY (project_id) REFERENCES projects(project_id)
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS trials (
  trial_id INT UNSIGNED NOT NULL,
  state VARCHAR(15) NOT NULL,
  usecase_json MEDIUMTEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  error VARCHAR(255),
  PRIMARY KEY (trial_id)
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS project_trials (
  project_id INT UNSIGNED NOT NULL,
  iteration_number INT UNSIGNED NOT NULL,
  usecase_path VARCHAR(255) NOT NULL,
  trial_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (trial_id),
  FOREIGN KEY (trial_id) REFERENCES trials(trial_id),
  FOREIGN KEY (project_id) REFERENCES projects(project_id),
  INDEX project_usecases USING BTREE(project_id, iteration_number, usecase_path(32)),
  INDEX usecase_trials USING BTREE(project_id, usecase_path(32), iteration_number)
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS results (
  result_id INT UNSIGNED NOT NULL,
  trial_id INT UNSIGNED NOT NULL,
  action_type VARCHAR(15) NOT NULL,
  action_order TINYINT UNSIGNED NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (trial_id) REFERENCES trials(trial_id),
  PRIMARY KEY (result_id)
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS result_texts (
  result_id INT UNSIGNED NOT NULL,
  txt LONGTEXT NOT NULL,
  FOREIGN KEY (result_id) REFERENCES results(result_id),
  PRIMARY KEY (result_id)
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS result_htmls (
  result_id INT UNSIGNED NOT NULL,
  html LONGTEXT NOT NULL,
  FOREIGN KEY(result_id) REFERENCES results(result_id),
  PRIMARY KEY (result_id)
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS result_screenshots (
  result_id INT UNSIGNED NOT NULL,
  image MEDIUMBLOB NOT NULL,
  FOREIGN KEY(result_id) REFERENCES results(result_id),
  PRIMARY KEY (result_id)
) ENGINE InnoDB;
