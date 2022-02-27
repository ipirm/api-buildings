import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { AuthService } from "./auth.service";
import { UserDecorator } from "../decorators/user.decorator";
import { LoginDto } from "./dto/login-dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

// import {Recaptcha} from "@nestlab/google-recaptcha";


@ApiTags("Auth")
@Controller("api/auth")
export class AuthController {
    constructor(private auth: AuthService) {
    }

    @Post("login-admin")
    @ApiOperation({ summary: "Login as Admin" })
    adminLogin(@Body() loginDto: LoginDto) {
        return this.auth.adminLogin(loginDto);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get("profile")
    @ApiOperation({ summary: "Get a Profile" })
    getProfile(@Request() req, @UserDecorator() user: any) {
        return this.auth.profile(user);
    }

    //
    // // @Recaptcha()
    @Post("login")
    @ApiOperation({ summary: "Login as User" })
    login(@Body() loginDto: LoginDto) {
        return this.auth.login(loginDto);
    }
    //
    // @Post("login/mid")
    // @ApiOperation({ summary: "Login as Mid" })
    // loginMida(@Body() loginDto: LoginDto) {
    //     return this.auth.loginMida(loginDto);
    // }
    //
    // @Post("login/mid-user")
    // @ApiOperation({ summary: "Login as Mid User" })
    // loginMidUser(@Body() loginDto: LoginDto) {
    //     return this.auth.loginMidaUser(loginDto);
    // }
    //
    // @Post("login/mid-admin")
    // @ApiOperation({ summary: "Login as Mid Admin" })
    // loginMidAdmin(@Body() loginDto: LoginDto) {
    //     return this.auth.loginMidaAdmin(loginDto);
    // }
}
