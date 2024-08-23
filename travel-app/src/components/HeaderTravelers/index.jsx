import React, { Component } from 'react';

class HeaderTravelers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      rooms: props.roomsData,
    };
    this.wrapperRef = React.createRef();
    this.contentRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.roomsData !== this.props.roomsData) {
      this.setState({ rooms: this.props.roomsData });
    }
  }

  handleClickOutside = (event) => {
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target) &&
      this.contentRef.current &&
      !this.contentRef.current.contains(event.target)
    ) {
      this.setState({ isFocused: false });
    }
  };

  handleClick = () => {
    this.setState((prevState) => ({
      isFocused: !prevState.isFocused,
    }));
  };

  handleRoomChange = (roomIndex, key, operation) => {
    this.setState((prevState) => {
      const rooms = [...prevState.rooms];
      const room = { ...rooms[roomIndex] };

      if (key === 'adults') {
        room.adults = Math.max(1, room.adults + operation);
      } else if (key === 'children') {
        room.children = Math.max(0, room.children + operation);
        if (operation > 0) {
          room.childrenAges = [...room.childrenAges, ''];
        } else {
          room.childrenAges = room.childrenAges.slice(0, -1);
        }
      }

      rooms[roomIndex] = room;
      return { rooms };
    });
  };

  handleChildAgeChange = (roomIndex, childIndex, age) => {
    this.setState((prevState) => {
      const rooms = [...prevState.rooms];
      rooms[roomIndex].childrenAges[childIndex] = age;
      return { rooms };
    });
  };

  handleAddRoom = () => {
    this.setState((prevState) => ({
      rooms: [...prevState.rooms, { adults: 2, children: 0, childrenAges: [] }],
    }));
  };

  handleRemoveRoom = (roomIndex) => {
    this.setState((prevState) => {
      const rooms = prevState.rooms.filter((_, index) => index !== roomIndex);
      return { rooms };
    });
  };

  handleApply = () => {
    const { rooms } = this.state;
    this.props.onApply(rooms);
    this.setState({ isFocused: false });
  };

  render() {
    const { isFocused, rooms } = this.state;

    const totalRooms = rooms.length;
    const totalTravelers = rooms.reduce(
      (acc, room) => acc + room.adults + room.children,
      0
    );

    return (
      <div className="relative w-full max-w-80 max-sm:m-auto">
        <div
          ref={this.wrapperRef}
          className={`border rounded-md px-4 py-2 text-gray-800 bg-white w-full font-semibold cursor-pointer ${
            isFocused ? 'border-orange-500' : 'border-gray-300'
          } flex justify-center items-center`}
          onClick={this.handleClick}
        >
          {totalRooms} quarto(s), {totalTravelers} viajante(s)
        </div>

        {isFocused && (
          <div
            className="absolute mt-2 border rounded-md shadow-lg bg-white p-4 z-10 w-full sm:w-60 ml-0 sm:-ml-20 md:ml-0 md:w-full mx-auto max-h-96 overflow-y-auto"
            ref={this.contentRef}
          >
            {rooms.map((room, roomIndex) => (
              <div key={roomIndex} className="mb-4 border-b border-gray-300 pb-4">
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-800">
                    Quarto {roomIndex + 1}
                  </p>
                  {rooms.length > 1 && (
                    <button
                      onClick={() => this.handleRemoveRoom(roomIndex)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  )}
                </div>
                <div className="flex items-center mb-4">
                  <p className="w-20 text-gray-600">Adultos</p>
                  <button
                    onClick={() => this.handleRoomChange(roomIndex, 'adults', -1)}
                    disabled={room.adults <= 1}
                    className="px-2 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="mx-2 text-lg text-black">{room.adults}</span>
                  <button
                    onClick={() => this.handleRoomChange(roomIndex, 'adults', 1)}
                    className="px-2 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center mb-4">
                  <p className="w-20 text-gray-600">Crianças</p>
                  <button
                    onClick={() => this.handleRoomChange(roomIndex, 'children', -1)}
                    disabled={room.children <= 0}
                    className="px-2 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="mx-2 text-lg text-black">{room.children}</span>
                  <button
                    onClick={() => this.handleRoomChange(roomIndex, 'children', 1)}
                    className="px-2 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
                {room.childrenAges.map((age, childIndex) => (
                  <div key={childIndex} className="mb-2 flex items-center">
                    <label className="text-gray-600 mr-2">
                      Idade da Criança {childIndex + 1}:
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="17"
                      value={age}
                      onChange={(e) =>
                        this.handleChildAgeChange(roomIndex, childIndex, e.target.value)
                      }
                      className="w-16 border rounded-md px-2 py-1 text-black"
                    />
                  </div>
                ))}
              </div>
            ))}
            <div className="flex justify-between mb-4 gap-4">
              <button
                onClick={this.handleAddRoom}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
              >
                Adicionar Quarto
              </button>
            </div>
            <div className="flex justify-end">
              <button
                onClick={this.handleApply}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Aplicar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HeaderTravelers;
