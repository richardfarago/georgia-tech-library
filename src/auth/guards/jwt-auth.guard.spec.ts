import { createMock } from "@golevelup/nestjs-testing";
import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "src/common/decorators/public.decorator";
import { JwtAuthGuard } from "./jwt-auth.guard";

describe('JWT AuthGuard', () => {
    let guard: JwtAuthGuard
    let reflector: Reflector
    let context: ExecutionContext

    beforeAll(() => {
        reflector = createMock<Reflector>()
        context = createMock<ExecutionContext>()

        // const isPublic = reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        //     context.getHandler(),
        //     context.getClass(),
        // ]);
    })

    beforeEach(() => {
        reflector = createMock<Reflector>()
        guard = new JwtAuthGuard(reflector)
    })

    it('should be defined', () => {
        expect(guard).toBeDefined()
    })

    it('should ', () => {
        expect(guard.canActivate(context)).toBeFalsy()
    })
})