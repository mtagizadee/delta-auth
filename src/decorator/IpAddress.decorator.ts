import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { IPv4, IPv6 } from "ipaddr.js";

export const IpAddress = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const { ip } = request;
        if (IPv4.isValid(ip)) return IPv4.parse(ip);
        if (IPv6.isValid(ip)) return IPv6.parse(ip).parts.join('.');
    },
);