import initStoryshots, {snapshotWithOptions} from '@storybook/addon-storyshots'

initStoryshots({
    // test: snapshotWithOptions({
    //     createNodeMock: (element) => {
    //         if (element.type === 'div') {
    //             return document.createElement('div');
    //         }
    //         if (element.type === 'input') {
    //             return document.createElement('input');
    //         }
    //     },
    // }),
    test: snapshotWithOptions((story) => ({
        createNodeMock: (element) => {
            if (story.kind === 'Slider') {
                return document.createElement('div');
            }
            return null;
        },
    })),
})