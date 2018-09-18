//
//  ViewController.swift
//  MyIOSComponent
//
//  Created by Clecotech Mac1 on 24/05/18.
//  Copyright © 2018 Clecotech. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        // Access Our Delegate
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        // Create a new UIViewController
        let rnViewController = UIViewController()
        // Assign our rootView into the UIViewController
        rnViewController.view = appDelegate.rootView
        // Present our new UIViewController
        self.present(rnViewController, animated: true, completion: nil)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

