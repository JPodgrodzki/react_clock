import React from 'react';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  today: Date;
  clockName: string;
  timerId: number | undefined;
};

export class Clock extends React.Component<{ clockName: string }, State> {
  state: State = {
    today: new Date(),
    clockName: 'Clock-0',
    timerId: undefined,
  };

  componentDidMount() {
    const newTimerId = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);

    const timeTimerId = window.setInterval(() => {
      this.setState({ today: new Date() });
      // eslint-disable-next-line no-console
      console.log(this.state.today.toUTCString().slice(-12, -4));
    }, 1000);

    this.setState({ timerId: timeTimerId });

    document.addEventListener('contextmenu', event => {
      event.preventDefault();
      clearInterval(newTimerId);
      clearInterval(timeTimerId);
      this.setState({ clockName: 'Clock-0', today: new Date() });
    });
  }

  componentWillUnmount() {
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
    }
  }

  componentDidUpdate(prevState: State) {
    if (prevState.clockName !== this.state.clockName) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevState.clockName} to ${this.state.clockName}`,
      );
    }
  }

  render() {
    const { today, clockName } = this.state;

    return (
      <div className="Clock">
        <strong className="Clock__name">{clockName}</strong>

        {' time is '}

        <span className="Clock__time">
          {today.toUTCString().slice(-12, -4)}
        </span>
      </div>
    );
  }
}
