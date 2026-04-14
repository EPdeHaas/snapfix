
class SnapFixer {

    #groupsObserver;
    #popupObserver;

    constructor () {
        console.log( "SnapFixer >> Start SnapFixer" );

        const config = { attributes: false, childList: true, subtree: false };

        this.#groupsObserver = this.#groupsObserver ?? new MutationObserver( this.captureGroupChange );
        this.#groupsObserver.disconnect();
        this.#groupsObserver.observe( this.groups, config );
        
        this.#popupObserver = this.#popupObserver ?? new MutationObserver( this.capturePopup );
        this.#popupObserver.disconnect();
        this.#popupObserver.observe( document.body, config );
    }

    get container () {
        return document.getElementsByClassName( 'SnapWeb' )[0];
    }

    get root () {
        return this.container.parentElement;
    }

    get groups () {
        return this.container.children[1];
    }

    get group () {
        return this.groups.children[0]
    }

    get groupBtn () {
        return this.group.querySelector( "[aria-label=Options]" );
    }

    captureGroupChange ( mutationList, observer ) {
        for (const mutation of mutationList) {
            if ( mutation.addedNodes.length > 0 ) {
                console.log( "SnapFixer >> Detected a memeber dropping from the main group." );
                snapFixer.groupBtn.click();
            }
        }
    }

    capturePopup ( mutationList, observer ) {
        for (const mutation of mutationList) {
            if ( mutation.addedNodes.length > 0 ) {
                let popup      = document.body.children[2];
                let checkboxes = popup.querySelectorAll( 'input[type=checkbox]' );
                let buttons    = popup.querySelectorAll( 'button' );
                for ( let checkbox of checkboxes ) {
                    if ( !checkbox.checked ) {
                        console.log( "SnapFixer >> Adding member back to the group." );
                        checkbox.click();
                    }
                }
                buttons[1].click();
            }
        }
    }
};
let snapFixer = new SnapFixer();
