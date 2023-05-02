'use strict';
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const opentelemetry = require("@opentelemetry/sdk-node");
const api = require('@opentelemetry/api');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { OTLPMetricExporter } = require("@opentelemetry/exporter-metrics-otlp-grpc");

const traceOtlpExporter = new OTLPTraceExporter({
});

const metricOtlpExporter = new OTLPMetricExporter({
});

const sdk = new opentelemetry.NodeSDK({
  traceExporter: traceOtlpExporter,
  metricExporter: metricOtlpExporter,
  autoDetectResources: true,
    instrumentations: [getNodeAutoInstrumentations(), new HttpInstrumentation()],
});

sdk.start()
