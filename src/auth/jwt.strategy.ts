import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      // Extraemos el token JWT del header HTTP "Authorization: Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRETO_SUPER_SEGURO', // Clave secreta para verificar el token
    });
  }

  // Se ejecuta una vez verificado el token con éxito
  async validate(payload: { sub: string; login: string }) {
    const user = await this.usersRepository.findById(payload.sub);
    return {
      userId: payload.sub,
      login: payload.login,
      isAdmin: user?.admin ?? false, // Incluimos el estado admin
    };
  }
}