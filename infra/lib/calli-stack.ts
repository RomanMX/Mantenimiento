import { Stack, StackProps, RemovalPolicy, CfnOutput } from "aws-cdk-lib";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class CalliStack extends Stack {
  public readonly elementosTable: Table;
  public readonly gruposTable: Table;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.elementosTable = new Table(this, "ElementosTable", {
      tableName: "calli-elementos",
      partitionKey: { name: "id", type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    this.elementosTable.addGlobalSecondaryIndex({
      indexName: "GrupoIndex",
      partitionKey: { name: "grupoId", type: AttributeType.STRING },
      sortKey: { name: "id", type: AttributeType.STRING },
    });

    this.elementosTable.addGlobalSecondaryIndex({
      indexName: "EstatusIndex",
      partitionKey: { name: "estatus", type: AttributeType.STRING },
      sortKey: { name: "id", type: AttributeType.STRING },
    });

    this.gruposTable = new Table(this, "GruposTable", {
      tableName: "calli-grupos",
      partitionKey: { name: "id", type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    new CfnOutput(this, "ElementosTableName", { value: this.elementosTable.tableName });
    new CfnOutput(this, "GruposTableName", { value: this.gruposTable.tableName });
  }
}
