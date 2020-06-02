/**
 * This is used for the {@link CkpGridCardComponent} to fire an event with the action id and the concerned element.
 */
export interface ActionElm {
    /**
     * Id action
     */
    id: string;

    /**
     * Data concerned by the action
     */
    data: any;
}
