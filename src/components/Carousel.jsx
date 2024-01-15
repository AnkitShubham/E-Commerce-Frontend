import React from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import wal1 from "../assets/images/wal1.jpg";
import wal2 from "../assets/images/wal2.jpg";

class MyCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          src: wal1,
          altText: "Slide 1",
          caption: "Slide 1 Caption",
        },
        {
          src: wal2,
          altText: "Slide 2",
          caption: "Slide 2 Caption",
        },
        // Add more slides as needed
      ],
      activeIndex: 0,
    };
  }

  next = () => {
    const nextIndex =
      this.state.activeIndex === this.state.items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    const nextIndex =
      this.state.activeIndex === 0
        ? this.state.items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  goToIndex = (newIndex) => {
    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { items, activeIndex } = this.state;

    const slides = items.map((item, index) => (
      <CarouselItem
        key={index}
        onExiting={() => (this.animating = true)}
        onExited={() => (this.animating = false)}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption captionHeader={item.caption} />
      </CarouselItem>
    ));

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={this.previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={this.next}
        />
      </Carousel>
    );
  }
}

export default MyCarousel;
