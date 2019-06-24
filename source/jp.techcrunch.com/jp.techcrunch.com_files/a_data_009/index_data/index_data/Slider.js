/**
 * Slider module.
 * @param  {Module} Frame Frame.
 * @return {Module}
 */
myFT.define("scripts/models/Slider", ["scripts/models/Frame"], function(Frame) {

  // Private variables.
  //var firstProductIndex = 0;

  /**
   * Create Slider as Circular Linked List with attributes as head, tail, length.
   * @constructor
   */
  function Slider() {
    this.head = null;
    this.tail = null;
    this.current = null;
    this.length = 0;
    this.isCircular = false;
  }

  /**
   * Add method adds data to slider.
   * @param {Element Object} frameData Data filled frame element.
   */
  Slider.prototype.add = function(frameData) {
    // Create new Frame.
    let frame = new Frame();
    // Set Frame data.
    frame.data = frameData;
    // If no frame in slide i.e. length == 0, add frame to tail and point head to current frame.
    if (this.length === 0) {
      this.head = frame;
      this.tail = frame;
      this.current = frame;
    } else {
      frame.prev = this.tail;
      this.tail.next = frame;
      this.tail = this.tail.next;
    }
    this.length++;
  }

  /**
   * makeCircular method makes slider as circular by pointing tail.next to head and head.prev to tail.
   * @return
   */
  Slider.prototype.makeCircular = function() {
    if (this.length > 0) {
      this.tail.next = this.head;
      this.head.prev = this.tail;
      this.isCircular = true;
    }
  }

  /**
   * Forward to update current pointer to current.next.
   * @return
   */
  Slider.prototype.forward = function() {
    if (this.current !== null) {
      this.current = this.current.next;
    }
  }

  /**
   * Backward to update current pointer to current.prev.
   * @return
   */
  Slider.prototype.backward = function() {
    if (this.current !== null) {
      this.current = this.current.prev;
    }
  }

  /**
   * Set current to the ith position where i starts from 0.
   * @param  {Number} position
   * @return
   */
  Slider.prototype.set = function(position) {
    if (position < this.length) {
      this.current = this.head;
      for (let i = 0; i < position; i++) {
        this.current = this.current.next;
      }
    }
  }

  /**
   * Returns length of the slider.
   * @return
   */
  Slider.prototype.getLength = function() {
    return this.length;
  }

  /**
   * Returns first product index.
   * @return {[index]} First Product Frame Index from Slider.
   */
  // Slider.prototype.getFirstProductIndex = function() {
  //   return firstProductIndex;
  // }

  /**
   * Sets first product index.
   * @return
   */
  // Slider.prototype.setFirstProductIndex = function(firstProductIndexIn) {
  //   firstProductIndex = firstProductIndexIn;
  // }

  return Slider;
});
