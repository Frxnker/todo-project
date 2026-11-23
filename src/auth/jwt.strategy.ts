import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extraemos el token JWT del header HTTP "Authorization: Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRETO_SUPER_SEGURO', // Clave secreta para verificar el token
    });
  }

  // Se ejecuta una vez verificado el token con éxito
  async validate(payload: { sub: string; login: string }) {
    return { userId: payload.sub, login: payload.login };
  }
}