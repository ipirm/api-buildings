import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login-dto";
import * as bcrypt from "bcrypt";
import { Role } from "../enums/roles.enum";
import { UserEntity } from "../user/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
      private jwtService: JwtService,
      private userService: UserService,
      @InjectRepository(UserEntity) private readonly user: Repository<UserEntity>
    ) {
    }


    async adminLogin(loginDto: LoginDto): Promise<any> {
        const user = await this.user.createQueryBuilder("user")
          .where("user.email = :email", { email: loginDto.email })
          .addSelect(["user.password"])
          .getOne();

        if (!user)
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "Извините, пользователь с такой комбинацией логина и пароля не найден"
            }, HttpStatus.FORBIDDEN);


        const valid = await bcrypt.compare(loginDto.password, user.password);

        if (!valid)
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "Извините, пользователь с такой комбинацией логина и пароля не найден"
            }, HttpStatus.FORBIDDEN);


        if (user.role === Role.Mida)
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "Вы не являетесь админом"
            }, HttpStatus.FORBIDDEN);

        return {
            access_token: this.jwtService.sign({ ...user })
        };
    }

    async login(loginDto: LoginDto): Promise<any> {
        let valid: Boolean;
        const user = await this.user.createQueryBuilder("user")
          .where("user.email = :email", { email: loginDto.email })
          .addSelect(["user.password"])
          .getOne();

        if (!user)
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "Извините, пользователь с такой комбинацией логина и пароля не найден"
            }, HttpStatus.FORBIDDEN);

        if (await bcrypt.compare(loginDto.password, user.password))
            valid = true;


        if (!valid)
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "Неверный пароль"
            }, HttpStatus.FORBIDDEN);


        return {
            access_token: this.jwtService.sign({ ...user })
        };
    }

    async loginMida(loginDto: LoginDto): Promise<any> {
        let valid: Boolean;
        const user = await this.user.createQueryBuilder("user")
          .where("user.email = :email", { email: loginDto.email })
          .addSelect(["user.password"])
          .getOne();

        if (!user)
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "Извините, пользователь с такой комбинацией логина и пароля не найден"
            }, HttpStatus.FORBIDDEN);

        if (await bcrypt.compare(loginDto.password, user.password))
            valid = true;

        if (!valid)
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "Неверный пароль"
            }, HttpStatus.FORBIDDEN);


        if (user.role !== Role.Mida)
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "Вы не являетесь участником программы :("
            }, HttpStatus.FORBIDDEN);

        if(user.online)
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "Пользователь онлайн"
            }, HttpStatus.FORBIDDEN);

        return {
            access_token: this.jwtService.sign({ ...user })
        };
    }

    async profile(user: any): Promise<any> {
        return await this.user
          .createQueryBuilder("user")
          .where("user.id = :id", { id: user.id })
          .getOne();
    }

    async setStatus(id, online: boolean): Promise<any> {
        const data = await this.user.findOne(id);
        console.log(data)
        return await this.user.update(id, { online: online });
    }

    //
    // async loginMidaUser(loginDto: LoginDto): Promise<any> {
    //     let valid: Boolean;
    //     const user = await this.user.createQueryBuilder("user")
    //       .where("user.email = :email", { email: loginDto.email })
    //       .addSelect(["user.password"])
    //       .getOne();
    //
    //     if (!user)
    //         throw new HttpException({
    //             status: HttpStatus.FORBIDDEN,
    //             error: "Извините, пользователь с такой комбинацией логина и пароля не найден"
    //         }, HttpStatus.FORBIDDEN);
    //
    //     if (await bcrypt.compare(loginDto.password, user.password))
    //         valid = true;
    //
    //     if (!valid)
    //         throw new HttpException({
    //             status: HttpStatus.FORBIDDEN,
    //             error: "Неверный пароль"
    //         }, HttpStatus.FORBIDDEN);
    //
    //
    //     if (user.role !== Role.MidaUser)
    //         throw new HttpException({
    //             status: HttpStatus.FORBIDDEN,
    //             error: "Вы не являетесь участником программы :("
    //         }, HttpStatus.FORBIDDEN);
    //
    //     return {
    //         access_token: this.jwtService.sign({ ...user })
    //     };
    // }
    //
    // async loginMidaAdmin(loginDto: LoginDto): Promise<any> {
    //     let valid: Boolean;
    //     const user = await this.user.createQueryBuilder("user")
    //       .where("user.email = :email", { email: loginDto.email })
    //       .addSelect(["user.password"])
    //       .getOne();
    //
    //     if (!user)
    //         throw new HttpException({
    //             status: HttpStatus.FORBIDDEN,
    //             error: "Извините, пользователь с такой комбинацией логина и пароля не найден"
    //         }, HttpStatus.FORBIDDEN);
    //
    //     if (await bcrypt.compare(loginDto.password, user.password))
    //         valid = true;
    //
    //     if (!valid)
    //         throw new HttpException({
    //             status: HttpStatus.FORBIDDEN,
    //             error: "Неверный пароль"
    //         }, HttpStatus.FORBIDDEN);
    //
    //
    //     if (user.role !== Role.MidaAdmin)
    //         throw new HttpException({
    //             status: HttpStatus.FORBIDDEN,
    //             error: "Вы не являетесь участником программы :("
    //         }, HttpStatus.FORBIDDEN);
    //
    //     return {
    //         access_token: this.jwtService.sign({ ...user })
    //     };
    // }
}
