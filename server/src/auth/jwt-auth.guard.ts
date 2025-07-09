import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(
    private jwtService: JwtService,
    // private authService: AuthService,
    private reflector: Reflector,
    // @InjectRepository(User) private userRepository: Repository<User> // Inject user repo
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const handlerName = context.getHandler().name;
    // this.logger.debug(`Handler: ${handlerName} | isPublic: ${isPublic}`);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      this.logger.warn(`Unauthorized: Missing token on route "${handlerName}"`);
      throw new UnauthorizedException("Missing access token");
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // const user = await this.authService.checkUserAvailibility(payload.id);
      request["user"] = payload;
    } catch (err) {
      this.logger.warn(`Unauthorized: Invalid token on route "${handlerName}"`);
      throw new UnauthorizedException("Invalid access token");
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(" ");
    return type === "Bearer" && token ? token : undefined;
  }
}
