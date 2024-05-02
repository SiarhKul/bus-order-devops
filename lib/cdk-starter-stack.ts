import * as cdk from 'aws-cdk-lib';
import {Construct} from 'constructs'
import {Bucket, CfnBucket} from "aws-cdk-lib/aws-s3";
import {CfnOutput, CfnParameter, Duration} from "aws-cdk-lib";

class L3Bucket extends Construct {
    constructor(scope: Construct, id: string,experation:number) {
        super(scope, id);

        new Bucket(this, 'MyL3Bucket', {
            lifecycleRules: [{
                expiration: Duration.days(experation)
            }]
        })
    }
}

export class CdkStarterStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new CfnBucket(this, "MyL1Bucket", {
            lifecycleConfiguration: {
                rules: [{
                    expirationInDays: 1,
                    status: 'Enabled'

                }]
            }
        })

        const duration =new CfnParameter(this, "duration",{
            default:6,
            minValue:1,
            maxValue:10,
            type: 'Number'
        })

      const MyL2Bucket=  new Bucket(this, 'MyL2Bucket', {
            lifecycleRules: [{
                expiration: Duration.days(duration.valueAsNumber)
            }]
        })


        new L3Bucket(this,"MyL3Bucket",3)

        new CfnOutput(this,"MyL2BucketName",{
            value: MyL2Bucket.bucketName
        })
    }
}
