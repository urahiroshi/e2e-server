USE e2e_server;

CREATE TABLE IF NOT EXISTS usecases (
  usecase_id INT UNSIGNED NOT NULL,
  name VARCHAR(127) NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (usecase_id)
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS actions (
  action_id INT UNSIGNED NOT NULL,
  type VARCHAR(15) NOT NULL,
  value VARCHAR(255),
  PRIMARY KEY (action_id)
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS usecase_actions (
  usecase_id INT UNSIGNED NOT NULL,
  action_order TINYINT UNSIGNED NOT NULL,
  action_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (usecase_id) REFERENCES usecases(usecase_id),
  FOREIGN KEY (action_id) REFERENCES actions(action_id),
  PRIMARY KEY (usecase_id, action_order)
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS action_selectors (
  action_id INT UNSIGNED NOT NULL,
  selector_order TINYINT UNSIGNED NOT NULL,
  selector VARCHAR(255) NOT NULL,
  FOREIGN KEY (action_id) REFERENCES actions(action_id),
  PRIMARY KEY (action_id, selector_order)
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS trials (
  trial_id INT UNSIGNED NOT NULL,
  usecase_id INT UNSIGNED NOT NULL,
  state VARCHAR(15) NOT NULL,
  usecase_json TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  error VARCHAR(255),
  FOREIGN KEY (usecase_id) REFERENCES usecases(usecase_id),
  PRIMARY KEY (trial_id)
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
  txt TEXT NOT NULL,
  FOREIGN KEY (result_id) REFERENCES results(result_id),
  PRIMARY KEY (result_id)
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS result_htmls (
  result_id INT UNSIGNED NOT NULL,
  html TEXT NOT NULL,
  FOREIGN KEY(result_id) REFERENCES results(result_id),
  PRIMARY KEY (result_id)
) ENGINE InnoDB;

CREATE TABLE IF NOT EXISTS result_screenshots (
  result_id INT UNSIGNED NOT NULL,
  image BLOB NOT NULL,
  FOREIGN KEY(result_id) REFERENCES results(result_id),
  PRIMARY KEY (result_id)
) ENGINE InnoDB;
