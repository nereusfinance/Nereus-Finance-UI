import { IntlShape } from 'react-intl/src/types';
import { ChainId } from '../../../helpers/config/types';

export interface DashboardLeftTopLineProps {
  chainId: ChainId;
  intl: IntlShape;
  onMobile?: boolean;
}

export function DashboardLeftTopLine(props: DashboardLeftTopLineProps) {
  return null;
}
