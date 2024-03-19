import * as cdk from 'aws-cdk-lib';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import {Construct} from 'constructs';

export class RdsStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Define the VPC
        const vpc = new ec2.Vpc(this, 'Vpc', {maxAzs: 2});

        // Define the security group
        const securityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
            vpc,
            description: 'Allow postgres access to ec2 instances',
            allowAllOutbound: true
        });
        securityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(5432), 'allow postgres access from the world');

        // Define the RDS instance
        const rdsInstance = new rds.DatabaseInstance(this, 'RdsInstance', {
            engine: rds.DatabaseInstanceEngine.postgres({
                version: rds.PostgresEngineVersion.VER_15
            }),
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.SMALL),
            vpc,
            securityGroups: [securityGroup],
            credentials: rds.Credentials.fromPassword('admin', new cdk.SecretValue('password')),
            databaseName: 'mydb',
            vpcSubnets: {
                subnetType: ec2.SubnetType.PUBLIC,
            },
            allocatedStorage: 25,
            storageType: rds.StorageType.GP2,
            deletionProtection: false,
        });
    }
}
