import type { Dispatch, FC, SetStateAction } from 'react';

import New from '@components/Shared/Badges/New';
import isFeatureAvailable from '@helpers/isFeatureAvailable';
import { Leafwatch } from '@helpers/leafwatch';
import { HomeFeedType } from '@hey/data/enums';
import { FeatureFlag } from '@hey/data/feature-flags';
import { HOME } from '@hey/data/tracking';
import { TabButton } from '@hey/ui';
import { useProfileStore } from 'src/store/persisted/useProfileStore';

interface FeedTypeProps {
  feedType: HomeFeedType;
  setFeedType: Dispatch<SetStateAction<HomeFeedType>>;
}

const FeedType: FC<FeedTypeProps> = ({ feedType, setFeedType }) => {
  const { fallbackToCuratedFeed } = useProfileStore();
  const enabled =
    isFeatureAvailable(FeatureFlag.Gardener) ||
    isFeatureAvailable(FeatureFlag.LensTeam);

  return (
    <div className="flex gap-3 overflow-x-auto px-5 sm:px-0">
      {enabled && (
        <TabButton
          active={feedType === HomeFeedType.FORYOU}
          badge={<New />}
          name="For You"
          onClick={() => {
            setFeedType(HomeFeedType.FORYOU);
            Leafwatch.track(HOME.SWITCH_FORYOU_FEED);
          }}
          showOnSm
        />
      )}
      <TabButton
        active={feedType === HomeFeedType.FOLLOWING}
        name={fallbackToCuratedFeed ? 'Curated Feed' : 'Following'}
        onClick={() => {
          setFeedType(HomeFeedType.FOLLOWING);
          Leafwatch.track(HOME.SWITCH_FOLLOWING_FEED);
        }}
        showOnSm
      />
      <TabButton
        active={feedType === HomeFeedType.PREMIUM}
        name="Premium"
        onClick={() => {
          setFeedType(HomeFeedType.PREMIUM);
          Leafwatch.track(HOME.SWITCH_PREMIUM_FEED);
        }}
        showOnSm
      />
    </div>
  );
};

export default FeedType;
