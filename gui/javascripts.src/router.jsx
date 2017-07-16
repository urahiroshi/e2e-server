import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import IterationPage from './views/pages/iteration';
import UsecasePage from './views/pages/usecase';
import TrialPage from './views/pages/trial';
import NotFoundPage from './views/pages/not-found.jsx';

const AppRouterComponent = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/projects/:projectId/iterations/:iterationNumber"
        component={IterationPage}
      />
      <Route
        path="/projects/:projectId/iterations/:iterationNumber/usecases/:usecasePath+"
        component={UsecasePage}
      />
      <Route
        path="/trials/:trialId"
        component={TrialPage}
      />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouterComponent;
