import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./jwt/constants";
import { AuthService } from "./auth.service";


@WebSocketGateway({ cors: true, allowEIO3: true})
export class AuthGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(
    private readonly jwt: JwtService,
    private readonly auth: AuthService
  ) {
  }

  @WebSocketServer()
  server;


  afterInit(server: any): any {
    console.log("Initizialized");
  }

  async handleConnection(@ConnectedSocket() socket: Socket): Promise<void> {
    // console.log(jwtConstants);
    //  console.log("connected", socket);
    console.log(socket.handshake.auth.token)
    const decoded = await this.jwt.verify(socket.handshake.auth.token, jwtConstants);
    console.log(decoded)
    await this.auth.setStatus(decoded.id, true,socket.handshake.address);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket): Promise<void> {
    console.log("disconnected");
    const decoded = await this.jwt.verify(socket.handshake.auth.token, jwtConstants);
    await this.auth.setStatus(decoded.id, false,socket.handshake.address);
  }

}
