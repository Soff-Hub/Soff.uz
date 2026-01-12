import OffersWaitingLoader from './OffersWaitingLoader';

export default {
    title: 'Features/OffersWaitingLoader',
    component: OffersWaitingLoader,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        bufferedCount: {
            control: { type: 'number', min: 0, max: 10 },
            description: 'Number of offers currently buffered',
        },
        remainingSeconds: {
            control: { type: 'number', min: 0, max: 15 },
            description: 'Remaining seconds until offers are shown',
        },
    },
};

// Default state - no offers yet
export const NoOffers = {
    args: {
        bufferedCount: 0,
        remainingSeconds: null,
    },
};

// First offer arrives, timer starts
export const FirstOffer = {
    args: {
        bufferedCount: 1,
        remainingSeconds: 15,
    },
};

// Multiple offers accumulating
export const MultipleOffers = {
    args: {
        bufferedCount: 2,
        remainingSeconds: 12,
    },
};

// Near threshold (3 offers)
export const NearThreshold = {
    args: {
        bufferedCount: 2,
        remainingSeconds: 5,
    },
};

// At threshold - should show immediately
export const AtThreshold = {
    args: {
        bufferedCount: 3,
        remainingSeconds: 8,
    },
};

// Countdown almost done
export const AlmostDone = {
    args: {
        bufferedCount: 1,
        remainingSeconds: 2,
    },
};

// Final second
export const FinalSecond = {
    args: {
        bufferedCount: 2,
        remainingSeconds: 1,
    },
};

