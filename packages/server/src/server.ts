import {
	HttpApi,
	HttpApiBuilder,
	HttpApiEndpoint,
	HttpApiGroup,
	HttpServer,
} from "@effect/platform";
import { Effect, Layer, Schema } from "effect";
import { createServer } from "node:http";
import { NodeHttpServer, NodeRuntime } from "@effect/platform-node";

// api.health.get()
class HealthGroup extends HttpApiGroup.make("health")
	.add(HttpApiEndpoint.get("get", "/").addSuccess(Schema.String))
	.prefix("/health") {}

const Api = HttpApi.make("Api").add(HealthGroup);

const HealthGroupLive = HttpApiBuilder.group(Api, "health", (handlers) =>
	Effect.gen(function* () {
		yield* Effect.logDebug("HelthGroupLive");
		return handlers.handle("get", () => Effect.succeed("Im alive!"));
	}),
);

const ApiLive = HttpApiBuilder.api(Api).pipe(Layer.provide(HealthGroupLive));

const HttpLive = HttpApiBuilder.serve().pipe(
	HttpServer.withLogAddress,
	Layer.provide(ApiLive),
	Layer.provide(NodeHttpServer.layer(createServer, { port: 3001 })),
);

NodeRuntime.runMain(Layer.launch(HttpLive));
