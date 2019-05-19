import * as intl from 'react-intl-universal';
import { setup as dialogSetup } from '@bndynet/dialog';

export function onLocaleChanged() {
    dialogSetup({
        labelOK: intl.get('ok'),
        labelCancel: intl.get('cancel'),
    });
}
