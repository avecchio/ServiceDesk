#include "AppDelegate.h"
#include "GeneratedPluginRegistrant.h"
import <SKYKit/SKYKit.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [GeneratedPluginRegistrant registerWithRegistry:self];
  SKYContainer *container = [SKYContainer defaultContainer];
  [container configAddress:@"https://your-endpoint.skygeario.com/"]; //Your server endpoint
  [container configureWithAPIKey:@"SKYGEAR_API_KEY"]; //Your Skygear API Key

  SKYContainer *skygear = [SKYContainer defaultContainer];
[[skygear auth] signupAnonymouslyWithCompletionHandler:^(SKYUser *user, NSError *error) {
    if (error != nil) {
        NSLog(@"Signup Error: %@", error.localizedDescription);
        return;
    }

    // Create Record Type "test" and put "Hello world" as value of key "content"
    // Advanced: Skygear Server will create a table "test" and appropriate
    //           columns in PostgreSQL in Development mode.
    SKYRecord *test = [SKYRecord recordWithRecordType:@"test"];
    test[@"content"] = @"Hello world";

    [skygear.publicCloudDatabase saveRecord:test completion:^(SKYRecord *record, NSError *error) {
        if (error != nil) {
            NSLog(@"Failed to save a record: %@", error.localizedDescription);
            return;
        }

        NSLog(@"Record saved with ID: %@", record.recordID.recordName);
    }];
}];
  // Override point for customization after application launch.
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

@end
