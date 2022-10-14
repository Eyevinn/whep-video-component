import { WebRTCPlayer } from "@eyevinn/webrtc-player";

const ComponentAttribute = {
  DYNAMIC: {
    SOURCE: 'src',
    AUTOPLAY: 'autoplay',
    MUTED: 'muted',
  }
}

const isSet = (value) => value === "" || !!value;

export default class WhepVideoComponent extends HTMLElement {
  static get observedAttributes() {
    return Object.values(ComponentAttribute.DYNAMIC)
  }

  constructor() {
    super();
    const wrapper = this.setupDOM();   
    this.setupPlayer(wrapper);
  }

  setupDOM() {
    this.attachShadow({ mode: 'open' });
    const { shadowRoot } = this;

    let styleTag = document.createElement('style');
    styleTag.innerHTML = "video { width: inherit; } div { width: inherit }";
    shadowRoot.appendChild(styleTag);

    const wrapper = document.createElement('div');
    shadowRoot.appendChild(wrapper);
    this.video = document.createElement('video');
    wrapper.appendChild(this.video);

    return wrapper;  
  }

  setupPlayer(wrapper) {
    this.player = new WebRTCPlayer({
      video: this.video,
      type: "whep"
    });
  }

  async attributeChangedCallback(name) {
    const src = this.getAttribute(ComponentAttribute.DYNAMIC.SOURCE);
    const autoplay = this.getAttribute(ComponentAttribute.DYNAMIC.AUTOPLAY);
    const muted = this.getAttribute(ComponentAttribute.DYNAMIC.MUTED);

    if (name === ComponentAttribute.DYNAMIC.SOURCE) {
      if (isSet(src)) {
        await this.player.load(new URL(src));
        if (isSet(autoplay)) {
          this.video.muted = isSet(muted);
          this.video.autoplay = true;
        }
      } else {
        console.error("Missing src attribute in <whep-video> element");
      }
    }
    if (name === ComponentAttribute.DYNAMIC.MUTED) {
      this.video.muted = isSet(muted);
    }
  }
}

customElements.define('whep-video', WhepVideoComponent);