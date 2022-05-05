import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { StakeDataProvider } from '../../libs/pool-data-provider/hooks/use-stake-data-context';
import { CURRENCY_ROUTE_PARAMS } from '../../helpers/router-types';

import StakingWrapper from './components/StakingWrapper';
import StakingVestConfirmation from './screens/StakingVestConfirmation';
import StakeWithApprovalConfirmation from './screens/StakeWithApprovalConfirmation';

import VestWithUnstakeConfirmation from './screens/VestWithUnstakeConfirmation';
import UnstakeAmount from './screens/UnstakeAmount';
import UnstakeConfirmation from './screens/UnstakeConfirmation';

import StakingTokensPanel from './screens/StakingTokensPanel';
import StakeAmount from './screens/StakeAmount';
import { stakeConfig } from '../../ui-config/stake';
import ErrorPage from '../../components/ErrorPage';

export default function Staking() {
  if (!stakeConfig) {
    return <ErrorPage title="Stake was not configured" />;
  }
  return (
    <StakeDataProvider stakeConfig={stakeConfig}>
      <StakingWrapper>
        <Switch>
          <Route exact={true} path="/staking" component={StakingTokensPanel} />
          <Route
            exact={true}
            path={`/staking/stake/${CURRENCY_ROUTE_PARAMS}`}
            component={StakeAmount}
          />
          <Route
            exact={true}
            path={`/staking/stake/${CURRENCY_ROUTE_PARAMS}/confirmation`}
            component={StakeWithApprovalConfirmation}
          />

          <Route
            exact={true}
            path="/staking/vest/confirmation"
            component={StakingVestConfirmation}
          />

          <Route
            exact={true}
            path={`/staking/vest-&-unstake/vest/confirmation/${CURRENCY_ROUTE_PARAMS}`}
            component={VestWithUnstakeConfirmation}
          />

          <Route
            exact={true}
            path={`/staking/vest-&-unstake/unstake/${CURRENCY_ROUTE_PARAMS}`}
            component={UnstakeAmount}
          />
          <Route
            exact={true}
            path={`/staking/vest-&-unstake/unstake/${CURRENCY_ROUTE_PARAMS}/confirmation`}
            component={UnstakeConfirmation}
          />
        </Switch>
      </StakingWrapper>
    </StakeDataProvider>
  );
}
