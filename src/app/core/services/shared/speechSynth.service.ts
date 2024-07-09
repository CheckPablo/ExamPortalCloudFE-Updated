import { Injectable } from '@angular/core';
import { SpeechProperties } from 'src/app/core/interfaces/speech.interface';
//import { EventEmitterService } from 'src/app/core/services/shared/event-emitter.service';

type RouteData = {
  langTo: string;
  voice: string;
};


@Injectable({
  providedIn: 'root',
})
export class SpeechSynthService {
  //private voices: SpeechSynthesisVoice[] = [];

  synthesis = window.speechSynthesis;
  /*voice: 'Google Deutsch',
      //langTo: 'de-DE',*/
  routeData: RouteData = {
    langTo:'en-GB',
    voice: 'Microsoft George - English (United Kingdom)',
  };

  start(text: string, rate = 1) {
    const textToSpeech = new SpeechSynthesisUtterance(text);
    
    textToSpeech.lang = this.routeData.langTo;
    textToSpeech.text = text;
    textToSpeech.rate = rate;

    textToSpeech.onend = function () {
      console.info('SpeechSynthesisUtterance.onend');
      
    };

    textToSpeech.onerror = function (error) {
      console.error('SpeechSynthesisUtterance.onerror ', error);
    };

    textToSpeech.onstart = function () {
      console.info('SpeechSynthesisUtterance.onstart');
    };
    // GET VOICE
    const voice = speechSynthesis.getVoices().filter((voice) => {
      return voice.name === this.routeData.voice;
    })[0];
    textToSpeech.voice = voice;

    this.synthesis.speak(textToSpeech);
  }
}