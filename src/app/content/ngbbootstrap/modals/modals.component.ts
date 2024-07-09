import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgBlockUI, BlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit {

  @BlockUI('basicModals') blockUIBasicModals: NgBlockUI;
  @BlockUI('modalThemes') blockUIModalThemes: NgBlockUI;

  public breadcrumb: any;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };
  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    this.breadcrumb = {
      'mainlabel': 'Modal',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Component',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Modal',
          'isLink': false
        }
      ]
    };
  }

  openDefaultModel(DefaultModelContent) {
    this.modalService.open(DefaultModelContent, { windowClass: 'animated fadeInDown' });
  }
  openModelIcon(modalIconContent) {
    this.modalService.open(modalIconContent, { windowClass: 'animated fadeInDown' });
  }
  openDisableKeyboard(disableKeyboardContent) {
    this.modalService.open(disableKeyboardContent, { windowClass: 'animated fadeInDown', keyboard: false });
  }
  openDisableBackDrop(DisableBackDropContent) {
    this.modalService.open(DisableBackDropContent, { windowClass: 'animated fadeInDown', backdrop: 'static' });
  }
  OpenShowModel(OpenShowModelContent) {
    this.modalService.open(OpenShowModelContent, { windowClass: 'animated fadeInDown' });
  }
  OpenDisableAnimation(DisableAnimationContent) {
    this.modalService.open(DisableAnimationContent);
  }
  PrimaryModel(PrimaryModelContent) {
    this.modalService.open(PrimaryModelContent, { windowClass: 'animated fadeInDown' });
  }
  SuccessModel(SuccessModelContent) {
    this.modalService.open(SuccessModelContent, { windowClass: 'animated fadeInDown' });
  }
  DangerModel(DangerModelContent) {
    this.modalService.open(DangerModelContent, { windowClass: 'animated fadeInDown' });
  }
  InfoModel(InfoModelContent) {
    this.modalService.open(InfoModelContent, { windowClass: 'animated fadeInDown' });
  }
  WarningModel(WarningModelContent) {
    this.modalService.open(WarningModelContent, { windowClass: 'animated fadeInDown' });
  }
  BorderModel(BorderModelContent) {
    this.modalService.open(BorderModelContent, { windowClass: 'animated fadeInDown' });
  }
  SmallModel(SmallModelContent) {
    this.modalService.open(SmallModelContent, { windowClass: 'animated fadeInDown', size: 'sm' });
  }
  DefaultSizeModel(DefaultSizeModelContent) {
    this.modalService.open(DefaultSizeModelContent, { windowClass: 'animated fadeInDown' });
  }
  LargeModel(LargeModelContent) {
    this.modalService.open(LargeModelContent, { windowClass: 'animated fadeInDown', size: 'lg' });
  }
  openDefaultHeadingModel(DefaultHeadingModelContent) {
    this.modalService.open(DefaultHeadingModelContent, { windowClass: 'animated fadeInDown' });
  }
  openSubtitleModel(SubtitleModelContent) {
    this.modalService.open(SubtitleModelContent, { windowClass: 'animated fadeInDown' });
  }
  openH1Model(H1ModelContent) {
    this.modalService.open(H1ModelContent, { windowClass: 'animated fadeInDown' });
  }
  openH2Model(H2ModelContent) {
    this.modalService.open(H2ModelContent, { windowClass: 'animated fadeInDown' });
  }
  openH3Model(H3ModelContent) {
    this.modalService.open(H3ModelContent, { windowClass: 'animated fadeInDown' });
  }
  openH4Model(H4ModelContent) {
    this.modalService.open(H4ModelContent, { windowClass: 'animated fadeInDown' });
  }
  openH5Model(H5ModelContent) {
    this.modalService.open(H5ModelContent, { windowClass: 'animated fadeInDown' });
  }
  openH6Model(H6ModelContent) {
    this.modalService.open(H6ModelContent, { windowClass: 'animated fadeInDown' });
  }
  openLoginForm(LoginFormContent) {
    this.modalService.open(LoginFormContent, { windowClass: 'animated fadeInDown' });
  }
  openLoginFormIcon(LoginFormIconContent) {
    this.modalService.open(LoginFormIconContent, { windowClass: 'animated fadeInDown' });
  }
  openBootstrapInputForm(BootstrapInputFormContent) {
    this.modalService.open(BootstrapInputFormContent, { windowClass: 'animated fadeInDown' });
  }
  openBounceAnimation(BounceContent) {
    this.modalService.open(BounceContent, { windowClass: 'animated bounce' });
  }
  openFlashAnimation(FlashContent) {
    this.modalService.open(FlashContent, { windowClass: 'animated flash' });
  }
  openPulseAnimation(PulseContent) {
    this.modalService.open(PulseContent, { windowClass: 'animated pulse' });
  }
  openRubberBandAnimation(RubberBandContent) {
    this.modalService.open(RubberBandContent, { windowClass: 'animated rubberBand' });
  }
  openShakeAnimation(ShakeContent) {
    this.modalService.open(ShakeContent, { windowClass: 'animated shake' });
  }
  openRollInAnimation(RollInContent) {
    this.modalService.open(RollInContent, { windowClass: 'animated rollIn' });
  }
  openSwingAnimation(SwingContent) {
    this.modalService.open(SwingContent, { windowClass: 'animated swing' });
  }
  openTadaAnimation(TadaContent) {
    this.modalService.open(TadaContent, { windowClass: 'animated tada' });
  }
  openWobbleAnimation(WobbleContent) {
    this.modalService.open(WobbleContent, { windowClass: 'animated wobble' });
  }
  openJelloAnimation(JelloContent) {
    this.modalService.open(JelloContent, { windowClass: 'animated jello' });
  }
  BounceInAnimation(BounceInContent) {
    this.modalService.open(BounceInContent, { windowClass: 'animated bounceIn' });
  }
  BounceInDownAnimation(BounceInDownContent) {
    this.modalService.open(BounceInDownContent, { windowClass: 'animated bounceInDown' });
  }
  BounceInLeftAnimation(BounceInLeftContent) {
    this.modalService.open(BounceInLeftContent, { windowClass: 'animated bounceInLeft' });
  }
  BounceInRightAnimation(BounceInRightContent) {
    this.modalService.open(BounceInRightContent, { windowClass: 'animated bounceInRight' });
  }
  BounceInUpAnimation(BounceInUpContent) {
    this.modalService.open(BounceInUpContent, { windowClass: 'animated bounceInUp' });
  }
  FadeInAnimation(FadeInContent) {
    this.modalService.open(FadeInContent, { windowClass: 'animated FadeIn' });
  }
  FadeInDownAnimation(FadeInDownContent) {
    this.modalService.open(FadeInDownContent, { windowClass: 'animated fadeInDown' });
  }
  FadeInDownBigAnimation(FadeInDownBigContent) {
    this.modalService.open(FadeInDownBigContent, { windowClass: 'animated fadeInDownBig' });
  }
  FadeInLeftAnimation(FadeInLeftContent) {
    this.modalService.open(FadeInLeftContent, { windowClass: 'animated fadeInLeft' });
  }
  FadeInLeftBigAnimation(FadeInLeftBigContent) {
    this.modalService.open(FadeInLeftBigContent, { windowClass: 'animated fadeInLeftBig' });
  }
  FadeInRightAnimation(FadeInRightContent) {
    this.modalService.open(FadeInRightContent, { windowClass: 'animated fadeInRight' });
  }
  FadeInRightBigAnimation(FadeInRightBigContent) {
    this.modalService.open(FadeInRightBigContent, { windowClass: 'animated fadeInRightBig' });
  }
  FadeInUpAnimation(FadeInUpContent) {
    this.modalService.open(FadeInUpContent, { windowClass: 'animated fadeInUp' });
  }
  FadeInUpBigAnimation(FadeInUpBigContent) {
    this.modalService.open(FadeInUpBigContent, { windowClass: 'animated fadeInUpBig' });
  }
  FlipInXAnimation(FlipInXContent) {
    this.modalService.open(FlipInXContent, { windowClass: 'animated flipInX' });
  }
  FlipInYAnimation(FlipInYContent) {
    this.modalService.open(FlipInYContent, { windowClass: 'animated flipInY' });
  }
  LightSpeedInAnimation(LightSpeedInContent) {
    this.modalService.open(LightSpeedInContent, { windowClass: 'animated lightSpeedIn' });
  }
  RotateInAnimation(RotateInContent) {
    this.modalService.open(RotateInContent, { windowClass: 'animated rotateIn' });
  }
  RotateInDownLeftAnimation(RotateInDownLeftContent) {
    this.modalService.open(RotateInDownLeftContent, { windowClass: 'animated rotateInDownLeft' });
  }
  RotateInDownRightAnimation(RotateInDownRightContent) {
    this.modalService.open(RotateInDownRightContent, { windowClass: 'animated rotateInDownRight' });
  }
  RotateInUpLeftAnimation(RotateInUpLeftContent) {
    this.modalService.open(RotateInUpLeftContent, { windowClass: 'animated rotateInUpLeft' });
  }
  RotateInUpRightAnimation(RotateInUpRightContent) {
    this.modalService.open(RotateInUpRightContent, { windowClass: 'animated rotateInUpRight' });
  }
  ZoomInAnimation(ZoomInContent) {
    this.modalService.open(ZoomInContent, { windowClass: 'animated zoomIn' });
  }
  ZoomInDownAnimation(ZoomInDownContent) {
    this.modalService.open(ZoomInDownContent, { windowClass: 'animated zoomInDown' });
  }
  ZoomInLeftAnimation(ZoomInLeftContent) {
    this.modalService.open(ZoomInLeftContent, { windowClass: 'animated zoomInLeft' });
  }
  ZoomInRightAnimation(ZoomInRightContent) {
    this.modalService.open(ZoomInRightContent, { windowClass: 'animated zoomInRight' });
  }
  zoomInUpAnimation(zoomInUpContent) {
    this.modalService.open(zoomInUpContent, { windowClass: 'animated zoomInUp' });
  }
  slideInUpAnimation(slideInUpContent) {
    this.modalService.open(slideInUpContent, { windowClass: 'animated slideInUp' });
  }
  SlideInLeftAnimation(SlideInLeftContent) {
    this.modalService.open(SlideInLeftContent, { windowClass: 'animated slideInLeft' });
  }
  SlideInRightAnimation(SlideInRightContent) {
    this.modalService.open(SlideInRightContent, { windowClass: 'animated slideInRight' });
  }
  SlideInDownAnimation(SlideInDownContent) {
    this.modalService.open(SlideInDownContent, { windowClass: 'animated slideInDown' });
  }

  reloadBasicModals() {
    this.blockUIBasicModals.start('Loading..');

    setTimeout(() => {
      this.blockUIBasicModals.stop();
    }, 2500);
  }

  reloadModalThemes() {
    this.blockUIModalThemes.start('Loading..');

    setTimeout(() => {
      this.blockUIModalThemes.stop();
    }, 2500);
  }

}
