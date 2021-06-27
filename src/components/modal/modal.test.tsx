import * as reactRedux from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import Modal from './index';
import { TEST_MODAL_ACTIVE, TEST_MODAL_INACTIVE } from '../../tests/mocks';

describe("Component testing", () => {
    const selector = jest.spyOn(reactRedux, 'useSelector');
    const dispatcher = jest.spyOn(reactRedux, 'useDispatch');

    beforeEach(() => {
        selector.mockClear();
        dispatcher.mockClear();
    });
    
    it("Should render the modal as inactive when app state is false", () => {
        const actionDispatcher = jest.fn();
        dispatcher.mockReturnValue(actionDispatcher);
        selector.mockReturnValue(TEST_MODAL_INACTIVE);
        const { getByTestId } = render(<Modal />);

        expect(getByTestId("modal_container")).not.toHaveClass("active")
    });

    it("Should render the modal as active when app state is true", () => {
        const actionDispatcher = jest.fn();
        dispatcher.mockReturnValue(actionDispatcher);
        selector.mockReturnValue(TEST_MODAL_ACTIVE);
        const { getByTestId } = render(<Modal />);
        const modal = getByTestId("modal_container");
        
        expect(modal).toHaveClass("active")
        expect(modal).toHaveClass(TEST_MODAL_ACTIVE.styleClass)
        expect(getByTestId("modal_title").textContent)
            .toEqual(TEST_MODAL_ACTIVE.title);
        expect(getByTestId("modal_message").textContent)
            .toEqual(TEST_MODAL_ACTIVE.message);
    });

    it("Should dispatch close action when user clicks on close button", () => {
        const actionDispatcher = jest.fn();
        dispatcher.mockReturnValue(actionDispatcher);
        selector.mockReturnValue(TEST_MODAL_ACTIVE);
        const { getByTestId } = render(<Modal />);

        // Ensure the component doesn't dispatch action right away.
        expect(actionDispatcher).not.toHaveBeenCalled()

        // Manually click on closing the modal and assert action is been triggered.
        const closeButton = getByTestId("modal_close");
        fireEvent.click(closeButton);
        expect(actionDispatcher).toHaveBeenCalled();
    });
});