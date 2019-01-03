export default class MyClock {
    constructor(props) {
      super(props);
  
      this.state = {
        currentTime: Date.now(),
      }; 
    }
  
    updateCurrentTime() {
      this.setState(state => ({
        ...state,
        currentTime: Date.now(),
      }));
      this.timeoutId = setTimeout(this.updateCurrentTime.bind(this), 1000);
    }
  
    componentWillMount() {
      this.updateCurrentTime();
      document.addEventListener('visibilitychange', () => {
        if(document.hidden) {
          clearTimeout(this.timeoutId);
        } else {
          this.updateCurrentTime();
        }
      }, false);
    }
  
    componentWillUnmount() {
      clearTimeout(this.timeoutId);
    }
  }