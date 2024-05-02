import {Construct} from "constructs";
import {Bucket} from "aws-cdk-lib/aws-s3";
import * as cdk from 'aws-cdk-lib';
import {CfnOutput, Duration, Fn} from 'aws-cdk-lib';

export class PhotosStack extends cdk.Stack {
    public readonly photosBucketArn: string;

    private stackSuffix: string

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.initializeSuffix()

        const photoBucket: Bucket = new Bucket(this, 'MyL2BucketV1', {
            bucketName: `photos-bucket-${this.stackSuffix}`,
            lifecycleRules: [{
                expiration: Duration.days(2)
            }]
        });

        this.photosBucketArn=photoBucket.bucketArn
        // new CfnOutput(this, 'photo-bucket', {
        //     value: photoBucket.bucketArn,
        //     exportName: 'photo-bucket'
        // })
    }

    private initializeSuffix(): void {
        const shortStackId: string = Fn.select(2, Fn.split('/', this.stackId));
        this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId))
    }
}
