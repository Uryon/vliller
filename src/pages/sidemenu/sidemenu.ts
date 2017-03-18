import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppVersion } from '@ionic-native/app-version';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Platform, ModalController } from 'ionic-angular';
import { About } from '../about/about';
import { Contribs } from '../contribs/contribs';

import { AppSettings } from '../../app/app.settings';
import { FeedbackFormService } from '../../services/feedback-form/feedback-form';

@Component({
    selector: 'sidemenu',
    templateUrl: 'sidemenu.html'
})

export class Sidemenu {

    public appVersion: string;

    constructor(
        private platform: Platform,
        private modalCtrl: ModalController,
        private feedbackFormService: FeedbackFormService
    ) {
        this.platform.ready().then(() => {
            new AppVersion().getVersionNumber().then(version => this.appVersion = version);
        });
    }

    /**
     * Open the app store page
     */
    public rateApp() {
        if (this.platform.is('android')) {
            new InAppBrowser().create('market://details?id=' + AppSettings.appId.android, '_system');
        } else if (this.platform.is('ios')) {
            new InAppBrowser().create('itms-apps://itunes.apple.com/fr/app/vliller/id' + AppSettings.appId.ios + '?mt=8', '_system');
        } else {
            console.error('Rate app - Unknow platform?!');
        }
    };

    /**
     *
     * @param {String} link
     */
    public openLink(link) {
        new InAppBrowser().create(link, '_system');
    };

    /**
     * Show bug report form
     */
    public openBugReport() {
        this.feedbackFormService.showModal();
    };

    /**
     * Show system social sharing to share the Vliller landing page.
     */
    public openSocialSharing() {
        new SocialSharing().shareWithOptions({
            url: AppSettings.vlillerSiteUrl
        });
    };

    public openAboutPage() {
        this.modalCtrl.create(About, {
            appVersion: this.appVersion
        }).present();
    }

    public openContribsPage() {
        this.modalCtrl.create(Contribs, {
            appVersion: this.appVersion
        }).present();
    }
}