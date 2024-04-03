import {io} from 'socket.io-client'

const socket = io.connect('https://homigo.online');

export default socket